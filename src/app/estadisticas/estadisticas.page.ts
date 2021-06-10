import { UsuarioService } from './../servicios/usuario.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  constructor(private usuarioService: UsuarioService) {
  }

  usuarios = this.usuarioService.getAllUsuarios();

  ionViewDidEnter() {
    this.createBarChart();
  }



  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Usuarios registrados'],
        datasets: [{
          label: 'Numero de Usuarios',
          //data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          data: [this.usuarios.length],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                suggestedMax: 5,
                beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
