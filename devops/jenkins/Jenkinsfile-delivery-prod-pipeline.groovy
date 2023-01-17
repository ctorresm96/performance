@Library('jenkins-sharedlib@master')
import sharedlib.WebAngularMicroAppUtil;
def utils = new WebAngularMicroAppUtil(steps, this);
// Project Name (4 letters)
def project               = 'NTLC';
/* Mail configuration */
// If recipients is null the mail is sent to the person who start the job
// The mails should be separated by commas(',')
def deploymentEnvironment = 'prod';
def artifactoryUrl        = 'http://paplnwind07:80/artifactory';

try {
   node {
    stage('Preparation') {
      utils.notifyByMail('START',recipients)
      checkout scm
      utils.prepare()
      env.project="${project}"
      env.deploymentEnvironment = "${deploymentEnvironment}"
      utils.setNodeAngularVersion("NODE16_CHROME97")
      utils.setAzureKeyVaultEnabled(true)
    }

    stage('Promote Release') {
      utils.promoteReleaseNode(params.RELEASE_TAG_NAME,"--prod --base-href ./",params.FORCE_RELEASE)
    }

    stage("Deploy to" +deploymentEnvironment) {
      def APP_NAME                  = utils.getApplicationNameNode()
      def APP_VERSION               = utils.getApplicationVersionNode();
      def AZURE_RESOURCE_GROUP_NAME = "devops-webapp-container"
      def AZURE_WEBAPP_NAME         = "devops-webapp-container2"

      utils.setDockerBuildEnvironmentVariables([
        "API_BCP_URL=apisbcp.com",
        "API_EXTERNAL_URL=int.apisbcp.com",
        "API_GATEWAY_SCOPE=channel.xxxx.default"
      ]);

      utils.withAzureVaultCredentials([
        [azureCredentialId: "api-gateway-client-id", azureCredentialVariable: "apiGatewayClientId" ],
        [azureCredentialId: "api-gateway-client-secret", azureCredentialVariable: "apiGatewayClientSecret" ],
        [azureCredentialId: "api-external-key", azureCredentialVariable: "apiExternalKey" ],
      ]){

        utils.setWebAppSettingsEnvironmentVariables([
          "API_GATEWAY_CLIENT_ID=${env.apiGatewayClientId}",
          "API_GATEWAY_CLIENT_SECRET=${env.apiGatewayClientSecret}",
          "API_EXTERNAL_KEY=${env.apiExternalKey}",
          "API_BCP_URL=https://bcp-node-api-mock.azurewebsites.net"
        ]);

        utils.deployToAzureWebappContainer(APP_NAME,APP_VERSION,AZURE_RESOURCE_GROUP_NAME,AZURE_WEBAPP_NAME)
      }
    }

    stage('Save Results') {
      utils.saveResultNode('tgz')
    }

    stage('Post Execution') {
      utils.executePostExecutionTasks()
      utils.notifyByMail('SUCCESS',recipients)
    }
  }
} catch(Exception e) {
   node {
      utils.executeOnErrorExecutionTasks()
      utils.notifyByMail('FAIL',recipients)
    throw e
   }
}
