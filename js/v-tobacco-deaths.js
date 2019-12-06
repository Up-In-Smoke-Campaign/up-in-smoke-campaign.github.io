function makeplot() {
    Plotly.d3.csv("../datasets/ukraine/tobacco-deaths.csv", function(data){ processData(data) } );
};

function processData(allRows) {

    console.log(allRows);
    var age_group = [], lung_cancer = [], other_cancers = [],
        ischemic_disease = [], stroke = [], other_cardiovascular = [],
        copd = [], other_respiratory = [], other_causes = []
    standard_deviation = [];

    for (var i=0; i<allRows.length; i++) {

        row = allRows[i];
        age_group.push( row['Age-group'] );
        lung_cancer.push( row['Lung_cancer'] );
        other_cancers.push( row['Other_cancers'] );
        ischemic_disease.push( row['Ischemic_disease'] );
        stroke.push( row['Stroke'] );
        other_cardiovascular.push( row['other_cardiovascular'] );
        copd.push( row['COPD'] );
        other_respiratory.push( row['Other_respiratory_diseases']);
        other_causes.push( row['Other_causes']);
    }

    makePlotly( age_group, lung_cancer, other_cancers, ischemic_disease, stroke,
        other_cardiovascular, copd, other_respiratory, other_causes, standard_deviation );

}

function makePlotly( age_group, lung_cancer, other_cancers, ischemic_disease, stroke, other_cardiovascular, copd, other_respiratory, other_causes, standard_deviation ){
    var trace1 = {
        x: age_group,
        y: lung_cancer,
        name: 'Lung cancer',
        line: {
            // width: 5
        },
    }

    var trace2 = {
        x: age_group,
        y: other_cancers,
        name: 'Other cancers'
    }

    var trace3 = {
        x: age_group,
        y: stroke,
        name: 'Stroke'
    }

    var trace4 = {
        x: age_group,
        y: other_cardiovascular,
        name: 'Other cardiovascular'
    }

    var trace5 = {
        x: age_group,
        y: copd,
        name: 'COPD'
    }

    var trace6 = {
        x: age_group,
        y: other_respiratory,
        name: 'Other respiratory'
    }

    var plotDiv = document.getElementById("plot");
    var traces = [trace1, trace2, trace3, trace4, trace5, trace6];

    var layout = {
        title: 'Tobacco-related deaths in Ukraine',
        xaxis: {
            title: 'Age groups',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'Deaths',
            showline: false
        },
        annotations: [
            {
                xref: 'paper',
                yref: 'paper',
                x: 0.5,
                y: -0.1,
                xanchor: 'center',
                yanchor: 'top',
                text: 'Source: "Regressive or progressive? : the effect of tobacco taxes in Ukraine"',
                showarrow: false,
                font: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(150,150,150)'
                }
            }
        ]
    };

    Plotly.newPlot('v-tobacco-related-deaths', traces, layout, {responsive:true});
};

makeplot();