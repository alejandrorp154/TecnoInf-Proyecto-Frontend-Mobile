import { UsuarioService } from './../servicios/usuario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import { Usuario } from '../modelos/usuario.model';
import { rangos } from '../modelos/medalla.model';
import { MedallaService } from '../servicios/medalla.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})



export class EstadisticasPage implements OnInit{

  @ViewChild('barChart') private barChart: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild("barCanvas") barCanvas: ElementRef;


  countIronWolf: number;
  countBronzeWolf: number;
  countSilverWolf: number;
  countGoldWolf: number;
  countPlatinumWolf: number;
  countDiamondWolf: number;
  countMasterWolf: number;
  countAlfaWolf: number;

  barCanvas2: Chart;

  doughnutChart: any;
  bars: any;
  colorArray: any;
  CantidadUsuariosTotal: any[];
  UsuariosPorMedalla: any[];
  CantidadVisitasPorUsuario: any[];
  CantidadusuariosPorPais: any[];
  Usuarios: Usuario[];
  rangosM: rangos;
  coloR = [];



  constructor(private usuarioService: UsuarioService, private estadisticaService: EstadisticasService, private medallaService: MedallaService) {
    this.countIronWolf = 0;
    this.countBronzeWolf = 0;
    this.countSilverWolf = 0;
    this.countGoldWolf = 0;
    this.countPlatinumWolf = 0;
    this.countDiamondWolf = 0;
    this.countMasterWolf = 0;
    this.countAlfaWolf = 0;
  }

  async ngOnInit(){
    let PCantidadUsuariosTotal = this.estadisticaService.getTipoEstadisticaAsync('CantidadUsuariosTotal');
    let PUsuariosPorMedalla = this.estadisticaService.getTipoEstadisticaAsync('UsuariosPorMedalla');
    let PCantidadVisitasPorUsuario = this.estadisticaService.getTipoEstadisticaAsync('CantidadVisitasPorUsuario');
    let PCantidadUsuariosPorPais = this.estadisticaService.getTipoEstadisticaAsync('CantidadUsuariosPorPais');

    await Promise.all([PCantidadUsuariosPorPais, PCantidadUsuariosTotal, PUsuariosPorMedalla, PCantidadVisitasPorUsuario]).then((values) => {
      this.CantidadusuariosPorPais = values[0];
      this.CantidadUsuariosTotal = values[1];
      this.UsuariosPorMedalla = values[2];
      this.CantidadVisitasPorUsuario = values[3];
    });
    this.getRangos();
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.createBarChart();
      this.doughnutChartMethod();
      this.lineChartMethod();
      this.BarCanvasMethod();
    }, 300);

  }

  getPaises(){
    return this.CantidadusuariosPorPais.filter(p => p.nombrePais != null);
  }

  getRangos(){
    let medallas: string[] = [];

    for (var enumMember in rangos) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
          medallas.push(rangos[enumMember]);
      }
    }
    return medallas;
  }

  getmedallasOcurrences(){
    let t = this;
    this.UsuariosPorMedalla.forEach(function(lineaEstadistica) {
      switch (lineaEstadistica.nombreMedalla){
        case 'ironWolf':
          t.countIronWolf += 1;
          break;
        case 'bronzeWolf':
          t.countBronzeWolf += 1;
        break;
        case 'silverWolf':
          t.countSilverWolf += 1;
          break;
        case 'goldWolf':
          t.countGoldWolf += 1;
          break;
        case 'platinumWolf':
          t.countPlatinumWolf += 1;
          break;
        case 'diamondWolf':
          t.countDiamondWolf += 1;
          break;
        case 'masterWolf':
          t.countMasterWolf += 1;
          break;
        case 'alphaWolf':
          t.countAlfaWolf += 1;
          break;
        default:
        break;
      }
    });
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Usuarios registrados'],
        datasets: [{
          label: 'Cantidad de Usuarios: ' + this.CantidadUsuariosTotal[0].cantidadUsuariosRegistrados,
          data: [this.CantidadUsuariosTotal[0].cantidadUsuariosRegistrados],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                suggestedMax: 500,
                beginAtZero: true
            }
          }]
        }
      }
    });
  }

  lineChartMethod() {
    this.getmedallasOcurrences();
    let t = this;
    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.CantidadVisitasPorUsuario.map(a => a.nombreUsuario).sort((one, two) => (one > two ? -1 : 1)).slice(0, 10),
        datasets: [
          {
            label: 'Usuarios que visitaron mas paises',
            fill: false,
            lineTension: 1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 1,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.CantidadVisitasPorUsuario.map(a => a.cantidadVisitas > 0).sort((one, two) => (one > two ? -1 : 1)).slice(0, 10),
            spanGaps: false,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                suggestedMax: 10,
                beginAtZero: true
            }
          }]
        }
      }
    });
  }

  BarCanvasMethod(){
    this.getmedallasOcurrences();
    let t = this;
    this.barCanvas2 = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.getRangos(),
        datasets: [
          {
            label: "Cantidad de usuarios por Medalla",
            data: [t.countIronWolf, t.countBronzeWolf, t.countSilverWolf, t.countGoldWolf, t.countPlatinumWolf, t.countDiamondWolf, t.countMasterWolf, t.countAlfaWolf],
            backgroundColor: [
              "rgba(0, 0, 0, 0.51)", //iron
              "rgba(116, 48, 0, 0.94)",//bronze
              "rgba(0, 0, 0, 0.12)",//silver
              "rgba(249, 164, 0, 0.99)", // gold
              "rgba(4, 189, 111, 0.69)",//platinum
              "rgba(4, 124, 214, 0.94)",//diamond
              "rgba(117, 20, 252, 0.94)",//master
              "rgba(255, 0, 0, 0.86)"//alfa
            ],
            borderColor: [
              "rgba(0, 0, 0, 1)", //iron
              "rgba(116, 48, 0, 1)",//bronze
              "rgba(0, 0, 0, 1)",//silver
              "rgba(249, 164, 0, 1)", // gold
              "rgba(4, 189, 111, 1)",//platinum
              "rgba(4, 124, 214, 1)",//diamond
              "rgba(117, 20, 252, 1)",//master
              "rgba(255, 0, 0, 1)"//alfa
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMax: 10,
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }


  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }


  doughnutChartMethod() {
    this.getPaises().map(a => a.nombrePais).forEach(pais => {

      this.coloR.push(this.dynamicColors());
    })
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.getPaises().map(a => a.nombrePais), //Paises
        datasets: [{
          label: '# de Usuarios',
          data: this.getPaises().map(cant => cant.cantidadUsuariosRegistrados),
          backgroundColor: this.coloR
          /*hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]*/
        }]
      }
    });
  }

}
