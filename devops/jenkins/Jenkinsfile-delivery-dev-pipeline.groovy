@Library('jenkins-sharedlib@master')
import sharedlib.WebAngularMicroAppUtil;
def utils = new WebAngularMicroAppUtil(steps, this, 'daily');
// Project Name (4 letters)
def project               = 'NTLC';
/* Mail configuration */
// If recipients is null the mail is sent to the person who start the job
// The mails should be separated by commas(',')
def recipients            = '';
def deploymentEnvironment = 'dev';

try {
   node { 
    stage('Preparation') {
      utils.notifyByMail('START', recipients)
      checkout scm
      env.project               = "${project}"
      env.deploymentEnvironment = "${deploymentEnvironment}"
      env.buildTimestamp = utils.getBuildTimestamp()
      utils.setNodeVersion("NODE16_CHROME97")
      utils.setReportPathsForSonar("coverage/performance")
      utils.prepare()   
      utils.setAzureKeyVaultEnabled(false)
    }

    stage('Build') {
      utils.build();
    }

    stage('QA') {
      utils.executeQA();
    }

    stage('SAST Analysis') {
      utils.executeSast();
    }
     
    stage('Deploy Artifact') {
      utils.uploadArtifact();
    }

    stage('Execute SCA') {
      utils.executeXraySCA();
    }

    stage('Deploy Azure') {
      def APP_NAME                  = utils.getApplicationNameNode();
      def APP_VERSION               = utils.getApplicationVersionNode();
      def AZURE_RESOURCE_GROUP_NAME = "RSGREU2NFMCD01";
      def AZURE_WEBAPP_NAME         = "wapceu2nfmcd01";
      def API_BCP_URL               = "bcp-node-api-mock.azurewebsites.net";

      utils.setDockerBuildEnvironmentVariables([
        "API_BCP_URL=${API_BCP_URL}"
      ]);

      utils.deployToAzureWebappContainer(APP_NAME,APP_VERSION,AZURE_RESOURCE_GROUP_NAME,AZURE_WEBAPP_NAME,true);
    }
  }
} catch(Exception e) {
  node {
    utils.executeOnErrorExecutionTasks()
    utils.notifyByMail('FAIL',recipients)
    throw e
  }
}
