import {render, html} from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.3/+esm';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

console.log(d3);

const csvData = `Date,Turnout
14 December 1918,57.20
15 November 1922,73.00
6 December 1923,71.10
29 October 1924,77.00
30 May 1929,76.30
27 October 1931,76.40
14 November 1935,71.10
5 July 1945,72.80
23 February 1950,83.90
25 October 1951,82.60
26 May 1955,76.80
8 October 1959,78.70
15 October 1964,77.10
31 March 1966,75.80
18 June 1970,72.00
28 February 1974,78.80
10 October 1974,72.80
3 May 1979,76.00
9 June 1983,72.70
11 June 1987,75.30
9 April 1992,77.70
1 May 1997,71.40
7 June 2001,59.40
5 May 2005,61.40
6 May 2010,65.10
7 May 2015,66.10
8 June 2017,68.70
12 December 2019,67.3
04 July 2024,0.0`;

const year = Array(52).fill(0);

const checkDate = (date, idx) => {
return (+d3.timeFormat('%V')(new Date(date)) === idx) ? 'highlight' : '';
}

const legendColors = [ "#C7FFB9", "#AAFF93", "#8DFF6E", "#83ED66", "#73D059", "#63B34D", "#539640", "#437934" ];

const colorDate = (turnout) => {
const colors = legendColors;
const colorScale = d3.scaleThreshold()
.domain([55, 60, 65, 70, 75, 80, 85])
.range(colors)

console.log(+turnout, colorScale(90))

return +turnout > 0 ? colorScale(+turnout) : 'var(--text)';
}

const legend = [50, 55, 60, 65, 70, 75, 80, 85, 90]

const jsonData = (d3.csvParse(csvData)).reverse();

const row = (d) => {
    return html`<div class="year"><span class="label">${d.Date.split(' ')[2]}</span>&nbsp;
        ${year.map((e, i) => (checkDate(d.Date, i) === 'highlight' ? 
            html`<span class="day" style="background-color: ${colorDate(d.Turnout)}" title="${d.Date.split(' ')[2]} - ${d.Turnout}%"></span>` : 
            html`<span class="day"></span>`))
        }
        </div>`
}
const renderGraph = () => {
    return html`<span>Year</span>&nbsp;<span style="float: right">Week of Year</span>
    ${jsonData.map(row)}`
};

const renderLegend = () => 
    html`Turnout: ${legendColors.map((d,i) => 
        html`<span class="day" style="background-color:${d}; width: 15px;"></span>&nbsp;${legend[i]} - ${legend[i+1]}%&nbsp;`)
    }`;

render(renderGraph(), document.querySelector('.chart'))
render(renderLegend(), document.querySelector('.legend'))