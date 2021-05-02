const charts = document.querySelector('.charts');
const symbols = JSON.parse(charts.dataset.symbols);

const addCanvas = (root, id) => {
    root.insertAdjacentHTML('beforeend', `<canvas id="${id}" width="400" height="400"></canvas>`);
    const chart = document.getElementById(id);
    return chart.getContext('2d');
}

const options = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'График изменения цены'
        }
    }
};

for (const symbol in symbols) {
    const ctx = addCanvas(charts, `chart_${symbol}`.replace('/', '_'));
    const labels = [];
    const dataset = {};
    dataset.label = symbol;
    dataset.data = [];
    dataset.fill = true;
    dataset.borderColor = 'rgb(75, 192, 192)';
    dataset.tension = 0.4;

    for (const date in symbols[symbol]) {
        const o = { year: "numeric", month: "long", day: "2-digit" };
        const prettifyDate = new Intl.DateTimeFormat("ru-RU", o)
            .format(new Date(parseInt(date)))
            .toString();
        labels.push(prettifyDate);
        dataset.data.push({ x: prettifyDate, y: symbols[symbol][date] });
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [dataset]
        },
        options: options
    });
}

jsonTree.create(symbols, document.querySelector('.json')).expand();