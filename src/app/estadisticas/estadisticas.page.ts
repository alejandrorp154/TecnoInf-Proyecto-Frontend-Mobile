import { BehaviorSubject } from "rxjs";
import { UsuarioService } from './../servicios/usuario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import { Usuario } from '../modelos/usuario.model';
import { rangos } from '../modelos/medalla.model';
import { MedallaService } from '../servicios/medalla.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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


  countIronWolf: number = 0;
  countBronzeWolf: number = 0;
  countSilverWolf: number = 0;
  countGoldWolf: number = 0;
  countPlatinumWolf: number = 0;
  countDiamondWolf: number = 0;
  countMasterWolf: number = 0;
  countAlfaWolf: number = 0;

  barCanvas2: Chart;

  doughnutChart: any;
  bars: any;
  colorArray: any;
  totales: BehaviorSubject<any[]> = new BehaviorSubject([]);
  UsuariosPorMedalla: BehaviorSubject<any[]> = new BehaviorSubject([]);
  CantidadVisitasPorUsuario: BehaviorSubject<any[]> = new BehaviorSubject([]);
  CantidadusuariosPorPais: BehaviorSubject<any[]> = new BehaviorSubject([]);
  Usuarios: Usuario[];
  rangosM: rangos;
  coloR = [];

  cantidadUsuariosTotal: number;
  cantidadPublicaciones: number;
  cantidadUbicaciones: number;
  cantidadEventos: number;

  single: any[] = []

  constructor(private usuarioService: UsuarioService, private estadisticaService: EstadisticasService, private medallaService: MedallaService) {

  }

  async ngOnInit(){

    this.totales.next(await this.estadisticaService.getTipoEstadisticaAsync('CantidadUsuariosTotal'));
    console.log(this.totales);
    this.estadisticasVarias();
    this.createBarChart();

    this.UsuariosPorMedalla.next(await this.estadisticaService.getTipoEstadisticaAsync('UsuariosPorMedalla'));
    this.BarCanvasMethod();

    this.CantidadVisitasPorUsuario.next(await this.estadisticaService.getTipoEstadisticaAsync('CantidadVisitasPorUsuario'));
    this.lineChartMethod()

    this.CantidadusuariosPorPais.next(await this.estadisticaService.getTipoEstadisticaAsync('CantidadUsuariosPorPais'));
    this.doughnutChartMethod();

    this.getRangos();
  }


  ionViewDidEnter() {

  }

  getPaises(){
    return this.CantidadusuariosPorPais.value.filter(p => p.nombrePais != null);
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
    this.UsuariosPorMedalla.value.forEach(function(lineaEstadistica) {
      switch (lineaEstadistica.nombreMedalla){
        case 'ironWolf':
          t.countIronWolf ++;
          break;
        case 'bronzeWolf':
          t.countBronzeWolf ++;
        break;
        case 'silverWolf':
          t.countSilverWolf ++;
          break;
        case 'goldWolf':
          t.countGoldWolf ++;
          break;
        case 'platinumWolf':
          t.countPlatinumWolf ++;
          break;
        case 'diamondWolf':
          t.countDiamondWolf ++;
          break;
        case 'masterWolf':
          t.countMasterWolf ++;
          break;
        case 'alphaWolf':
          t.countAlfaWolf ++;
          break;
        default:
        break;
      }
    });
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ['Usuarios', 'Eventos','Publicaciones Hechas','Ubicaciones registradas' ],
        datasets: [{
          label: '',
          data: this.single,
          backgroundColor: ['rgb(38, 194, 129)','rgb(226, 28, 28)', 'rgb(28, 28, 226)', 'rgb(242, 255, 46)'], // array should have same number of elements as number of dataset
          borderColor: ['rgb(38, 194, 129)','rgb(226, 28, 28)', 'rgb(28, 28, 226)', 'rgb(242, 255, 46)'],// array should have same number of elements as number of dataset
          borderWidth: 1,

        }]
      },
      options: {
        scales: {
          xAxes: [{
              ticks: {
                suggestedMax: 300,
                beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        }
      }
    });
  }

  lineChartMethod() {
    let t = this;
    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.CantidadVisitasPorUsuario.value.map(a => a.nombreUsuario).sort((one, two) => (one > two ? -1 : 1)).slice(0, 10),
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
            data: this.CantidadVisitasPorUsuario.value.map(a => a.cantidadVisitas > 0).sort((one, two) => (one > two ? -1 : 1)).slice(0, 10),
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
                suggestedMax: 30,
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

  estadisticasVarias() {
    this.cantidadUsuariosTotal =  this.totales.value[0].cantidadUsuariosRegistrados;
    this.cantidadPublicaciones = this.totales.value[0].cantidadPublicaciones;
    this.cantidadEventos = this.totales.value[0].cantidadEventos;
    this.cantidadUbicaciones = this.totales.value[0].cantidadUbicaciones;
    var stats = [this.cantidadUsuariosTotal,this.cantidadEventos, this.cantidadPublicaciones,this.cantidadUbicaciones];

    this.single.push(...stats);
  }
}
