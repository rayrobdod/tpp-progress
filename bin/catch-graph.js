var data = Array.prototype.concat.apply([], tppData.filter(function (c) { return c.Name.indexOf("Season") >= 0; })
    .map(function (c) { return c.Runs.filter(function (r) { return r.Events.filter(function (e) { return e.Group == "Pokemon"; }).length > 0; }).map(function (r) {
    return {
        color: r.ColorPrimary,
        label: r.RunName,
        data: r.Events.filter(function (e) { return e.Group == "Pokemon" && e.Name != "Egg"; })
            .sort(function (e1, e2) { return Duration.parse(e1.Time, r.StartTime).TotalTime(c.Scale) - Duration.parse(e2.Time, r.StartTime).TotalTime(c.Scale); })
            .map(function (e, i) { return [Duration.parse(e.Time, r.StartTime).TotalTime(TPP.Scale.Days), i + 1]; }),
    };
}); }));
var $tooltip = null;
$.plot($('.charts')
    .css({ width: '80vw', height: '80vh', margin: 'auto' })
    .on('plothover', function (e, pos, item) {
    if (item) {
        $tooltip = $tooltip || $('<div class="tooltip">').appendTo('body').css('position', 'absolute');
        var dur = new Duration(0);
        dur.TotalDays = item.datapoint[0];
        var label = item.series.label + "\n" + item.datapoint[1] + " Pokémon\n" + dur.toString(TPP.Scale.Days);
        console.log(label);
        $tooltip.css({ left: item.pageX, top: item.pageY })
            .attr('data-label', label)
            .show();
    }
    else if ($tooltip)
        $tooltip.hide();
}), data, {
    legend: {
        backgroundOpacity: .5
    },
    grid: {
        hoverable: true
    }
});
$('.charts').append($("<div class='axisLabel'>").text('Days'))
    .append($("<div class='axisLabel yaxisLabel'>").text('Pokémon'));
