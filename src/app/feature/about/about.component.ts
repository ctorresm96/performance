import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  currency = 'S/';
  headData = {
    titleOne: { name: 'CATEGORÍA', key: 'category' },
    titleTwo: { name: 'PORCENTAJE', key: 'por' },
    titleThree: { name: 'IMPORTE', key: 'amount' },
  };
  bodyData = [
    {
      columnOne: 'Pago de haberes',
      columnTwo: '9.1%',
      columnThree: '10.00',
      color: 'primary-600',
    },
    {
      columnOne: 'Pago a proveedores',
      columnTwo: '45.5%',
      columnThree: '50.00',
      color: 'primary-300',
    },
    {
      columnOne: 'Multas',
      columnTwo: '27.3%',
      columnThree: '30.00',
      color: 'primary-200',
    },
    {
      columnOne: 'Pago de letras',
      columnTwo: '18.2%',
      columnThree: '20.00',
      color: 'complementary-600',
    },
    {
      columnOne: 'Pago de financiamientos',
      columnTwo: '18.2%',
      columnThree: '20.00',
      color: 'complementary-400',
    },
    {
      columnOne: 'Transferencias',
      columnTwo: '18.2%',
      columnThree: '40.00',
      color: 'secondary-600',
    },
  ];
  chartData = {
    graphTitle: 'Total',
    TotalAmount: '143541',
    headData: this.headData,
    bodyData: this.bodyData,
  };

  addItem() {
    this.chartData = {
      ...this.chartData,
      bodyData: [
        ...this.chartData.bodyData,
        {
          columnOne: 'Impuestos y aportaciones',
          columnTwo: '18.2%',
          columnThree: '20.00',
          color: 'secondary-400',
        },
      ],
    };
  }

  removeItem() {
    this.chartData.bodyData.pop();
    this.chartData = {
      ...this.chartData,
      bodyData: [...this.chartData.bodyData],
    };
  }

  changeCurrency(currency: string) {
    this.currency = currency;
  }
}
