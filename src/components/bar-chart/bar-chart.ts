import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { scaleBand, ScaleBand, scaleLinear, ScaleLinear, scaleOrdinal, ScaleOrdinal, schemeCategory10 } from 'd3-scale';
import { Axis, axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { BaseType, Selection, window } from 'd3-selection';
import { SvgChart } from 'd3kit';

/**
 * Define the shape of the incoming data for the chart, i.e.
 * it should be an array of category/value pairs (string/number),
 * categories on the x axis, numeric values on the y axis
 */
export interface BarDatum {
    x: string;
    y: number;
}

@Component({
  selector: 'bar-chart',
  templateUrl: 'bar-chart.html'
})
export class BarChart extends SvgChart implements OnChanges {

  @Input('data') bcdata: BarDatum[];

  // define private properties
  private xScale: ScaleBand<string>;
  private yScale: ScaleLinear<number, number>;
  private colors: ScaleOrdinal<string, string>;
  private xAxis:  Axis<string>;
  private yAxis:  Axis<number|Object>;
  private xAxisG: Selection<BaseType, any, BaseType, any>;
  private yAxisG: Selection<BaseType, any, BaseType, any>;

  constructor(private el: ElementRef) {
    super(el.nativeElement);

    // define private properties
    this.xScale = scaleBand().range([0, this.getInnerWidth()]).padding(0.1);
    this.yScale = scaleLinear().range([this.getInnerHeight(), 0]);
    this.colors = scaleOrdinal(schemeCategory10);
    this.xAxis  = axisBottom(this.xScale);
    this.yAxis  = axisLeft(this.yScale);
    this.xAxisG = this.rootG.append('g');
    this.yAxisG = this.rootG.append('g');

    // add basic event listeners
    this.draw = this.draw.bind(this);
    this.on('resize.default', this.draw);
    this.on('data.default', this.draw);

    // setup autoresize
    // this.fit({mode: 'aspectRatio', ratio: 4/3}, true);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data(changes['bcdata'].currentValue);
  }

  draw(): void {
    // don't do anything if we don't have data
    if (!this.hasData()) { return; }

    // get the data
    const data: BarDatum[] = this.data();

    // update x and y scales to match the data
    this.xScale.domain(data.map((d: BarDatum) => d.x))
        .range([0, this.getInnerWidth()]);
    this.yScale.domain([0, max(data, (d: BarDatum) => +d.y)])
        .range([this.getInnerHeight(), 0]);

    // create a set of bars
    let bars = this.rootG.selectAll('.bar').data(data);

    // remove the bars (to prepare for re-drawing the chart)
    bars.exit().remove();

    // (re)draw the bars (rectangles)
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d: BarDatum) => this.xScale(d.x))
        .attr('width', this.xScale.bandwidth())
        .attr('y', (d: BarDatum) => this.yScale(+d.y))
        .attr('height', (d: BarDatum) => this.getInnerHeight() - this.yScale(+d.y))
        .style('fill', (d: BarDatum) => this.colors(d.x));

    // (re)draw the x axis
    this.xAxisG.attr('transform', `translate(0, ${this.getInnerHeight()})`).call(this.xAxis);

    // (re)draw the y axis
    this.yAxisG.call(this.yAxis);
  }
}
