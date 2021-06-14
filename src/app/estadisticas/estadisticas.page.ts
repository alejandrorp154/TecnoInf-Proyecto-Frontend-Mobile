import { UsuarioService } from './../servicios/usuario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { MedallaService } from 'src/app/servicios/medalla.service';
import { rangos } from 'src/app/models/medalla.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})

export class EstadisticasPage implements OnInit{

  @ViewChild('barChart') private barChart: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  doughnutChart: any;
  bars: any;
  colorArray: any;
  CantidadUsuariosTotal: any[];
  UsuariosPorMedalla: any[];
  CantidadVisitasPorUsuario: any[];
  CantidadusuariosPorPais: any[];
  Usuarios: Usuario[];
  rangosM: rangos;

  constructor(private usuarioService: UsuarioService, private estadisticaService: EstadisticasService, private medallaService: MedallaService) {
  }

  async ngOnInit(){
    let PCantidadUsuariosTotal = this.estadisticaService.getTipoEstadisticaAsync('CantidadUsuariosTotal');
    let PUsuariosPorMedalla = this.estadisticaService.getTipoEstadisticaAsync('UsuariosPorMedalla');
    let PCantidadVisitasPorUsuario = this.estadisticaService.getTipoEstadisticaAsync('CantidadVisitasPorUsuario');
    let PCantidadUsuariosPorPais = this.estadisticaService.getTipoEstadisticaAsync('CantidadUsuariosPorPais');
    
    await Promise.all([PCantidadUsuariosPorPais, PCantidadUsuariosTotal, PUsuariosPorMedalla, PCantidadVisitasPorUsuario]).then((values) => {
      console.log(values);
      this.CantidadusuariosPorPais = values[0];
      this.CantidadUsuariosTotal = values[1];
      this.UsuariosPorMedalla = values[2];
      this.CantidadVisitasPorUsuario = values[3];
    });
    this.getRangos();
  }

  //usuarios = this.usuarioService.getAllUsuariosAsync();

  // Obtengo las estadisticas que voy a mostrar
  
  ionViewDidEnter() {
    // console.log('Usuarios: ' , this.usuarios);
    // console.log('TotalUsuarios: ' , this.CantidadUsuariosTotal);
    // console.log('UsuariosPorMedalla', this.UsuariosPorMedalla);
    // console.log('CantidadVisitasPorUsuario: ', this.CantidadVisitasPorUsuario);
    // console.log('UsuariosPorPaises', this.CantidadusuariosPorPais);
    // console.log('PAISES', this.getPaises());

    this.createBarChart();
    this.doughnutChartMethod();
    this.lineChartMethod();

   
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
  

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Usuarios registrados'],
        datasets: [{
          label: 'Cantiadad de Usuarios: ' + this.CantidadUsuariosTotal[0].cantidadUsuariosRegistrados,
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
    this.lineCanvas = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.getRangos(), //Medallas
        datasets: [
          {
            label: 'Usuarios Por Medalla',
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
            data: this.UsuariosPorMedalla.map(upm => upm.nombreMedalla === this.getRangos().includes(upm.nombreMedalla)),
            spanGaps: false,
          }
        ]
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

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.getPaises().map(a => a.nombrePais), //Paises
        datasets: [{
          label: '# of Votes',
          data: [this.getPaises().map(cant => cant.cantidadUsuariosRegistrados)],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }

}
