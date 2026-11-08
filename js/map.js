(function () {
  'use strict';

  var mapWrapper = document.getElementById('map-svg-wrapper');
  if (!mapWrapper) return;

  if (typeof L === 'undefined') {
    mapWrapper.innerHTML =
      '<p style="padding:24px;color:#3D2010;font-size:15px;">' +
      'The map could not be loaded. Check your internet connection, or use the ' +
      '"Show as list" button above.</p>';
  }
  var hasLeaflet = (typeof L !== 'undefined');

  var HLW = window.HLW || {};

  var FALLBACK_REASON = 'No assessment text is available for this barangay yet.';
  var FALLBACK_BASIS = 'Not yet assessed';
  var GMAPS_URL = 'https://www.google.com/maps/place/Hagonoy,+Bulacan';
  var DETAIL_ZOOM = 16;
  var ZOOMED_MIN = 14;

  var REAL = [
    { name: 'Abulalas',        lat: 14.85351, lng: 120.76356, risk: 'Moderate' },
    { name: 'Carillo',         lat: 14.86045, lng: 120.75981, risk: 'Low' },
    { name: 'Iba',             lat: 14.87127, lng: 120.75500, risk: 'Low' },
    { name: 'Iba-Ibayo',       lat: 14.87149, lng: 120.76985, risk: 'Low' },
    { name: 'Mercado',         lat: 14.82584, lng: 120.71906, risk: 'High' },
    { name: 'Palapat',         lat: 14.86287, lng: 120.75145, risk: 'Moderate' },
    { name: 'Pugad',           lat: 14.78243, lng: 120.74168, risk: 'High' },
    { name: 'Sagrada Familia', lat: 14.80814, lng: 120.73732, risk: 'High' },
    { name: 'San Agustin',     lat: 14.84404, lng: 120.74625, risk: 'Moderate' },
    { name: 'San Isidro',      lat: 14.86356, lng: 120.73426, risk: 'Moderate' },
    { name: 'San Jose',        lat: 14.83196, lng: 120.71125, risk: 'Moderate' },
    { name: 'San Juan',        lat: 14.86455, lng: 120.74456, risk: 'Moderate' },
    { name: 'San Miguel',      lat: 14.85413, lng: 120.74293, risk: 'High' },
    { name: 'San Nicolas',     lat: 14.82328, lng: 120.72852, risk: 'High' },
    { name: 'San Pablo',       lat: 14.82879, lng: 120.75400, risk: 'Moderate' },
    { name: 'San Pascual',     lat: 14.81206, lng: 120.70470, risk: 'Moderate' },
    { name: 'San Pedro',       lat: 14.84072, lng: 120.75880, risk: 'Moderate' },
    { name: 'San Roque',       lat: 14.78897, lng: 120.71099, risk: 'Moderate' },
    { name: 'San Sebastian',   lat: 14.82826, lng: 120.73968, risk: 'High' },
    { name: 'Santa Cruz',      lat: 14.81662, lng: 120.72266, risk: 'Moderate' },
    { name: 'Santa Elena',     lat: 14.81218, lng: 120.75537, risk: 'High' },
    { name: 'Santa Monica',    lat: 14.84074, lng: 120.72163, risk: 'High' },
    { name: 'Santo Niño',      display: 'Santo Niño (Poblacion)', lat: 14.83606, lng: 120.73833, risk: 'High' },
    { name: 'Santo Rosario',   lat: 14.81848, lng: 120.72521, risk: 'High' },
    { name: 'Tampok',          lat: 14.85415, lng: 120.72185, risk: 'High' },
    { name: 'Tibaguin',        lat: 14.77466, lng: 120.76021, risk: 'High' }
  ];

  var GEO = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"name":"Abulalas"},"geometry":{"type":"Polygon","coordinates":[[[120.77346,14.86147],[120.76743,14.86109],[120.76177,14.86142],[120.75956,14.85489],[120.75546,14.8506],[120.75501,14.85013],[120.7559,14.84792],[120.76481,14.8448],[120.76757,14.84824],[120.76768,14.85515],[120.77346,14.86147]]]}},{"type":"Feature","properties":{"name":"Carillo"},"geometry":{"type":"Polygon","coordinates":[[[120.76786,14.86516],[120.76308,14.86714],[120.75792,14.86463],[120.7533,14.85917],[120.75474,14.85548],[120.75546,14.8506],[120.75956,14.85489],[120.76177,14.86142],[120.76743,14.86109],[120.76786,14.86516]]]}},{"type":"Feature","properties":{"name":"Iba"},"geometry":{"type":"Polygon","coordinates":[[[120.76261,14.87821],[120.74272,14.87508],[120.746,14.86471],[120.75626,14.86708],[120.75792,14.86463],[120.76308,14.86714],[120.76786,14.86516],[120.76261,14.87821]]]}},{"type":"Feature","properties":{"name":"Mercado"},"geometry":{"type":"Polygon","coordinates":[[[120.72783,14.82863],[120.71765,14.83336],[120.71415,14.82786],[120.71066,14.82755],[120.71126,14.81954],[120.71742,14.82103],[120.72605,14.82138],[120.72783,14.82863]]]}},{"type":"Feature","properties":{"name":"Palapat"},"geometry":{"type":"Polygon","coordinates":[[[120.75792,14.86463],[120.75626,14.86708],[120.746,14.86471],[120.74605,14.85921],[120.7533,14.85917],[120.75792,14.86463]]]}},{"type":"Feature","properties":{"name":"Pugad"},"geometry":{"type":"Polygon","coordinates":[[[120.76059,14.80365],[120.75734,14.80513],[120.75125,14.80019],[120.74539,14.80103],[120.73921,14.79666],[120.73726,14.79122],[120.72777,14.78978],[120.72666,14.78592],[120.71648,14.77412],[120.71152,14.76646],[120.72412,14.76346],[120.72601,14.76951],[120.73024,14.77249],[120.73821,14.77345],[120.74281,14.76162],[120.75004,14.75882],[120.75308,14.76843],[120.75098,14.77349],[120.74876,14.77947],[120.75309,14.78428],[120.7611,14.78896],[120.76544,14.78601],[120.76672,14.79549],[120.76059,14.80365]]]}},{"type":"Feature","properties":{"name":"Sagrada Familia"},"geometry":{"type":"Polygon","coordinates":[[[120.74742,14.82069],[120.72998,14.82387],[120.72981,14.81645],[120.72752,14.81417],[120.72891,14.79497],[120.72777,14.78978],[120.73726,14.79122],[120.73921,14.79666],[120.74539,14.80103],[120.7496,14.80738],[120.74742,14.82069]]]}},{"type":"Feature","properties":{"name":"San Agustin"},"geometry":{"type":"Polygon","coordinates":[[[120.75501,14.85013],[120.75091,14.8518],[120.74272,14.84935],[120.73597,14.84994],[120.73666,14.8481],[120.73541,14.8426],[120.73933,14.83871],[120.74797,14.83502],[120.74867,14.8338],[120.75094,14.83879],[120.75714,14.84328],[120.7559,14.84792],[120.75501,14.85013]]]}},{"type":"Feature","properties":{"name":"San Isidro"},"geometry":{"type":"Polygon","coordinates":[[[120.73897,14.87357],[120.73005,14.86605],[120.72326,14.86472],[120.73219,14.85532],[120.73325,14.8582],[120.74294,14.85935],[120.73889,14.86993],[120.73897,14.87357]]]}},{"type":"Feature","properties":{"name":"San Jose"},"geometry":{"type":"Polygon","coordinates":[[[120.73218,14.83369],[120.72672,14.83122],[120.71242,14.83723],[120.7069,14.83479],[120.70314,14.83627],[120.69705,14.83336],[120.69794,14.82902],[120.71066,14.82755],[120.71415,14.82786],[120.71765,14.83336],[120.72783,14.82863],[120.73047,14.82848],[120.73242,14.83364],[120.73218,14.83369]]]}},{"type":"Feature","properties":{"name":"San Juan"},"geometry":{"type":"Polygon","coordinates":[[[120.74272,14.87508],[120.73897,14.87357],[120.73889,14.86993],[120.74294,14.85935],[120.74614,14.85691],[120.75474,14.85548],[120.7533,14.85917],[120.74605,14.85921],[120.746,14.86471],[120.74272,14.87508]]]}},{"type":"Feature","properties":{"name":"San Miguel"},"geometry":{"type":"Polygon","coordinates":[[[120.74294,14.85935],[120.73325,14.8582],[120.73219,14.85532],[120.73597,14.84994],[120.74272,14.84935],[120.75091,14.8518],[120.75501,14.85013],[120.75546,14.8506],[120.75474,14.85548],[120.74614,14.85691],[120.74294,14.85935]]]}},{"type":"Feature","properties":{"name":"San Nicolas"},"geometry":{"type":"Polygon","coordinates":[[[120.73047,14.82848],[120.72783,14.82863],[120.72605,14.82138],[120.72981,14.81645],[120.72998,14.82387],[120.73047,14.82848]]]}},{"type":"Feature","properties":{"name":"San Pablo"},"geometry":{"type":"Polygon","coordinates":[[[120.75795,14.83447],[120.75094,14.83879],[120.74867,14.8338],[120.74645,14.82429],[120.75122,14.82539],[120.76137,14.81857],[120.76182,14.82348],[120.75672,14.83015],[120.75795,14.83447]]]}},{"type":"Feature","properties":{"name":"San Pascual"},"geometry":{"type":"Polygon","coordinates":[[[120.71066,14.82755],[120.69794,14.82902],[120.69632,14.82199],[120.69959,14.81492],[120.6963,14.80463],[120.69251,14.78672],[120.70452,14.79757],[120.70786,14.80527],[120.71961,14.81545],[120.72226,14.81935],[120.71742,14.82103],[120.71126,14.81954],[120.71066,14.82755]]]}},{"type":"Feature","properties":{"name":"San Pedro"},"geometry":{"type":"Polygon","coordinates":[[[120.76481,14.8448],[120.7559,14.84792],[120.75714,14.84328],[120.75094,14.83879],[120.75795,14.83447],[120.76261,14.83652],[120.76481,14.8448]]]}},{"type":"Feature","properties":{"name":"San Roque"},"geometry":{"type":"Polygon","coordinates":[[[120.72611,14.81506],[120.71961,14.81545],[120.70786,14.80527],[120.70452,14.79757],[120.69251,14.78672],[120.68703,14.77348],[120.69842,14.76831],[120.71152,14.76646],[120.71648,14.77412],[120.72666,14.78592],[120.72777,14.78978],[120.72891,14.79497],[120.72752,14.81417],[120.72611,14.81506]]]}},{"type":"Feature","properties":{"name":"San Sebastian"},"geometry":{"type":"Polygon","coordinates":[[[120.74867,14.8338],[120.74797,14.83502],[120.73242,14.83364],[120.73047,14.82848],[120.72998,14.82387],[120.74742,14.82069],[120.74645,14.82429],[120.74867,14.8338]]]}},{"type":"Feature","properties":{"name":"Santa Cruz"},"geometry":{"type":"Polygon","coordinates":[[[120.72611,14.81506],[120.72226,14.81935],[120.71961,14.81545],[120.72611,14.81506]]]}},{"type":"Feature","properties":{"name":"Santa Elena"},"geometry":{"type":"Polygon","coordinates":[[[120.76137,14.81857],[120.75122,14.82539],[120.74645,14.82429],[120.74742,14.82069],[120.7496,14.80738],[120.74539,14.80103],[120.75125,14.80019],[120.75734,14.80513],[120.76059,14.80365],[120.76671,14.80575],[120.76809,14.81134],[120.76109,14.81343],[120.76137,14.81857]]]}},{"type":"Feature","properties":{"name":"Santa Monica"},"geometry":{"type":"Polygon","coordinates":[[[120.73666,14.8481],[120.72796,14.84849],[120.7222,14.84571],[120.70936,14.84823],[120.70314,14.83627],[120.7069,14.83479],[120.71242,14.83723],[120.72672,14.83122],[120.73218,14.83369],[120.73249,14.83787],[120.73933,14.83871],[120.73541,14.8426],[120.73666,14.8481]]]}},{"type":"Feature","properties":{"name":"Santo Niño"},"geometry":{"type":"Polygon","coordinates":[[[120.74797,14.83502],[120.73933,14.83871],[120.73249,14.83787],[120.73218,14.83369],[120.73242,14.83364],[120.74797,14.83502]]]}},{"type":"Feature","properties":{"name":"Santo Rosario"},"geometry":{"type":"Polygon","coordinates":[[[120.72605,14.82138],[120.71742,14.82103],[120.72226,14.81935],[120.72611,14.81506],[120.72752,14.81417],[120.72981,14.81645],[120.72605,14.82138]]]}},{"type":"Feature","properties":{"name":"Tampok"},"geometry":{"type":"Polygon","coordinates":[[[120.73219,14.85532],[120.72326,14.86472],[120.7143,14.86198],[120.70936,14.84823],[120.7222,14.84571],[120.72796,14.84849],[120.73666,14.8481],[120.73597,14.84994],[120.73219,14.85532]]]}},{"type":"Feature","properties":{"name":"Tibaguin"},"geometry":{"type":"Polygon","coordinates":[[[120.76544,14.78601],[120.7611,14.78896],[120.75309,14.78428],[120.74876,14.77947],[120.75098,14.77349],[120.75431,14.77126],[120.75323,14.76463],[120.75484,14.75946],[120.7633,14.76163],[120.77,14.77007],[120.76943,14.78249],[120.76544,14.78601]]]}},{"type":"Feature","properties":{"name":"Iba-Ibayo"},"geometry":{"type":"Polygon","coordinates":[[[120.77346,14.86147],[120.77465,14.86224],[120.77365,14.8812],[120.76261,14.87821],[120.76786,14.86516],[120.76743,14.86109],[120.77346,14.86147]]]}}]};

  function key(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  var fromData = {};
  (HLW.barangays || []).forEach(function (b) { fromData[key(b.name)] = b; });

  var barangays = REAL.map(function (r) {
    var o = fromData[key(r.name)] || {};
    return {
      id: o.id || key(r.name),
      k: key(r.name),
      name: r.display || r.name,
      lat: r.lat,
      lng: r.lng,
      risk: o.risk || r.risk,
      reason: o.reason || FALLBACK_REASON,
      basis: o.basis || FALLBACK_BASIS
    };
  });
  var byKey = {};
  barangays.forEach(function (b) { byKey[b.k] = b; });

  var RISK_CONFIG = {
    'High': { fill: '#C1440E', stroke: '#FFFFFF', label: 'High Risk', short: 'High', shape: 'triangle', css: 'high' },
    'Moderate': { fill: '#F59E0B', stroke: '#0B2E3F', label: 'Moderate Risk', short: 'Moderate', shape: 'diamond', css: 'moderate' },
    'Low': { fill: '#2E7D32', stroke: '#FFFFFF', label: 'Low Risk', short: 'Low', shape: 'circle', css: 'low' },
    'Not yet assessed': { fill: '#5F6B7A', stroke: '#FFFFFF', label: 'Not yet assessed', short: 'Not assessed', shape: 'square', css: 'none' }
  };

  function cfgOf(risk) {
    return RISK_CONFIG[risk] || RISK_CONFIG['Not yet assessed'];
  }

  function markerShape(risk, size) {
    size = size || 14;
    var cfg = cfgOf(risk);
    var s = size;
    var h = Math.round(s * 0.866);

    if (cfg.shape === 'triangle') {
      return (
        '<polygon points="0,' + (-h * 0.667) + ' ' + s + ',' + (h * 0.333) + ' -' + s + ',' + (h * 0.333) + '"' +
        ' fill="' + cfg.fill + '" stroke="' + cfg.stroke + '" stroke-width="1.5" aria-hidden="true"/>'
      );
    }
    if (cfg.shape === 'diamond') {
      return (
        '<polygon points="0,' + (-s) + ' ' + s + ',0 0,' + s + ' -' + s + ',0"' +
        ' fill="' + cfg.fill + '" stroke="' + cfg.stroke + '" stroke-width="2" aria-hidden="true"/>'
      );
    }
    if (cfg.shape === 'circle') {
      return (
        '<circle cx="0" cy="0" r="' + s + '"' +
        ' fill="' + cfg.fill + '" stroke="' + cfg.stroke + '" stroke-width="1.5" aria-hidden="true"/>'
      );
    }
    return (
      '<rect x="-' + s + '" y="-' + s + '" width="' + (s * 2) + '" height="' + (s * 2) + '"' +
      ' fill="' + cfg.fill + '" stroke="' + cfg.stroke + '" stroke-width="1.5" aria-hidden="true"/>'
    );
  }

  var activeFilter = 'All';
  var selectedKey = null;
  var zoomedKey = null;
  var savedView = null;
  var polys = {};

  function latLngOf(b) { return [b.lat, b.lng]; }

  function streetViewUrl(lat, lng) {
    return 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' +
      lat.toFixed(6) + ',' + lng.toFixed(6);
  }

  var map = null;
  var markerLayer = null;
  var areaLayer = null;
  var HOME_BOUNDS = [[14.76, 120.69], [14.89, 120.79]];

  function addTextControl(label, title, position, onClick) {
    var Ctrl = L.Control.extend({
      options: { position: position },
      onAdd: function () {
        var wrap = L.DomUtil.create('div', 'leaflet-bar hlw-ctrl');
        var a = L.DomUtil.create('a', '', wrap);
        a.href = '#';
        a.title = title;
        a.setAttribute('role', 'button');
        a.textContent = label;
        L.DomEvent.disableClickPropagation(wrap);
        L.DomEvent.on(a, 'click', function (e) {
          L.DomEvent.preventDefault(e);
          onClick();
        });
        return wrap;
      }
    });
    map.addControl(new Ctrl());
  }

  var detailsPanel = document.getElementById('map-details-panel');

  function zoomButtonHtml(isZoomed) {
    var icon = isZoomed
      ? '<line x1="5" y1="12" x2="19" y2="12"/>'
      : '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>';
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + icon + '</svg>' +
      '<span>' + (isZoomed ? 'Zoom out' : 'Zoom in here') + '</span>';
  }

  function syncZoomButton() {
    if (!detailsPanel) return;
    var btn = detailsPanel.querySelector('[data-zoom-toggle]');
    if (!btn) return;
    var isZoomed = zoomedKey !== null && zoomedKey === selectedKey;
    btn.innerHTML = zoomButtonHtml(isZoomed);
    btn.setAttribute('aria-pressed', isZoomed ? 'true' : 'false');
    btn.classList.toggle('is-zoomed', isZoomed);
  }

  function zoomInTo(b) {
    if (!map) return;
    if (!savedView) {
      savedView = { center: map.getCenter(), zoom: map.getZoom() };
    }
    zoomedKey = b.k;
    map.setView(latLngOf(b), DETAIL_ZOOM, { animate: true });
    syncZoomButton();
  }

  function zoomOutOfDetail() {
    if (!map) return;
    var target = savedView;
    zoomedKey = null;
    savedView = null;
    if (target) {
      map.setView(target.center, target.zoom, { animate: true });
    } else {
      map.fitBounds(HOME_BOUNDS, { padding: [10, 10] });
    }
    syncZoomButton();
  }

  function resetToHome() {
    if (!map) return;
    zoomedKey = null;
    savedView = null;
    map.fitBounds(HOME_BOUNDS, { padding: [10, 10] });
    syncZoomButton();
  }

  if (hasLeaflet) {
    map = L.map(mapWrapper, {
      center: [14.83, 120.74],
      zoom: 12,
      maxZoom: 20,
      scrollWheelZoom: false,
      preferCanvas: true
    });

    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');

    var esri = 'https://server.arcgisonline.com/ArcGIS/rest/services/';

    var streets = L.tileLayer(esri + 'World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 20,
      maxNativeZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, OpenStreetMap contributors, and the GIS user community'
    });

    var topo = L.tileLayer(esri + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 20,
      maxNativeZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS, OpenStreetMap contributors, and the GIS user community'
    });

    var satellite = L.layerGroup([
      L.tileLayer(esri + 'World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        maxNativeZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Maxar, Earthstar Geographics, and the GIS User Community'
      }),
      L.tileLayer(esri + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 20,
        maxNativeZoom: 18
      })
    ]);

    streets.addTo(map);

    L.control.layers({
      'Streets': streets,
      'Topographic': topo,
      'Satellite': satellite
    }, null, {
      collapsed: true,
      position: 'topright'
    }).addTo(map);

    areaLayer = L.layerGroup().addTo(map);
    markerLayer = L.layerGroup().addTo(map);

    if (GEO) {
      HOME_BOUNDS = L.geoJSON(GEO).getBounds();
    }
    map.fitBounds(HOME_BOUNDS, { padding: [10, 10] });

    addTextControl('Reset view', 'Show all of Hagonoy', 'topleft', resetToHome);
    addTextControl('Open in Google Maps', 'Open Hagonoy in Google Maps', 'topleft', function () {
      window.open(GMAPS_URL, '_blank', 'noopener,noreferrer');
    });

    setTimeout(function () {
      map.invalidateSize();
      map.fitBounds(HOME_BOUNDS, { padding: [10, 10] });
    }, 250);
    window.addEventListener('load', function () { map.invalidateSize(); });

    map.on('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });

    map.on('zoomend', function () {
      if (zoomedKey !== null && map.getZoom() < ZOOMED_MIN) {
        zoomedKey = null;
        savedView = null;
        syncZoomButton();
      }
    });
  }

  function styleFor(b) {
    var cfg = cfgOf(b.risk);
    var shown = (activeFilter === 'All' || b.risk === activeFilter);
    var selected = (selectedKey === b.k);
    return {
      color: selected ? '#2E1503' : cfg.fill,
      weight: selected ? 4 : (shown ? 2 : 1),
      opacity: shown ? 0.95 : 0.35,
      fillColor: cfg.fill,
      fillOpacity: selected ? 0.45 : (shown ? 0.24 : 0.03)
    };
  }

  function refreshStyles() {
    Object.keys(polys).forEach(function (k) {
      polys[k].poly.setStyle(styleFor(polys[k].b));
    });
  }

  function renderAreas() {
    if (!hasLeaflet || !GEO) return;
    areaLayer.clearLayers();
    polys = {};

    GEO.features.forEach(function (ft) {
      var b = byKey[key(ft.properties.name)];
      if (!b) return;
      var cfg = cfgOf(b.risk);

      var layer = L.geoJSON(ft, { style: function () { return styleFor(b); } });
      layer.eachLayer(function (poly) {
        polys[b.k] = { poly: poly, b: b };
        poly.bindTooltip(b.name + ' (' + cfg.label + ')', { sticky: true });
        poly.on('mouseover', function () {
          if (activeFilter === 'All' || b.risk === activeFilter) {
            poly.setStyle({ weight: 3, fillOpacity: 0.42 });
          }
        });
        poly.on('mouseout', function () { poly.setStyle(styleFor(b)); });
        poly.on('click', function () { showDetails(b); });
      });
      layer.addTo(areaLayer);
    });
  }

  function renderMarkers() {
    if (!hasLeaflet) return;
    markerLayer.clearLayers();

    barangays.forEach(function (b) {
      if (activeFilter !== 'All' && b.risk !== activeFilter) return;

      var cfg = cfgOf(b.risk);
      var label = b.name + ' (' + cfg.label + ')';

      var icon = L.divIcon({
        className: 'hlw-marker',
        html: '<svg width="28" height="28" viewBox="-14 -14 28 28" aria-hidden="true" focusable="false" ' +
              'style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.55));">' +
                markerShape(b.risk, 10) +
              '</svg>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      var m = L.marker(latLngOf(b), {
        icon: icon,
        title: label,
        keyboard: true,
        riseOnHover: true
      });

      m.on('click', function () { showDetails(b); });
      m.addTo(markerLayer);

      var el = m.getElement();
      if (el) { el.setAttribute('aria-label', label); }
    });
  }

  function showDetails(b) {
    selectedKey = b.k;
    refreshStyles();
    if (!detailsPanel) return;
    var cfg = cfgOf(b.risk);
    var isZoomed = zoomedKey !== null && zoomedKey === b.k;

    detailsPanel.className = 'map-details-panel has-selection map-details-panel--' + cfg.css;
    detailsPanel.innerHTML =
      '<div class="details-head">' +
        '<h3 class="details-title">' + escHtml(b.name) + '</h3>' +
        '<span class="risk-badge risk-badge--' + cfg.css + '">' +
          '<svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden="true" focusable="false" style="margin-right:6px;">' +
            markerShape(b.risk, 6) +
          '</svg>' +
          escHtml(cfg.label) +
        '</span>' +
      '</div>' +
      '<p class="details-reason">' + escHtml(b.reason || '') + '</p>' +
      '<p class="details-basis"><strong>Basis:</strong> ' + escHtml(b.basis || '') + '</p>' +
      '<div class="details-links">' +
        '<button type="button" class="details-link details-link--primary' + (isZoomed ? ' is-zoomed' : '') + '" data-zoom-toggle aria-pressed="' + (isZoomed ? 'true' : 'false') + '">' +
          zoomButtonHtml(isZoomed) +
        '</button>' +
        '<a class="details-link" href="' + streetViewUrl(b.lat, b.lng) + '" target="_blank" rel="noopener noreferrer">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
          '<span>Open Street View</span>' +
        '</a>' +
      '</div>';
  }

  if (detailsPanel) {
    detailsPanel.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-zoom-toggle]') : null;
      if (!t) return;
      e.preventDefault();
      var b = byKey[selectedKey];
      if (!b) return;
      if (zoomedKey !== null && zoomedKey === b.k) {
        zoomOutOfDetail();
      } else {
        zoomInTo(b);
      }
    });
  }

  var showListBtn = document.getElementById('show-list-btn');
  var barangayList = document.getElementById('barangay-list-view');
  var listShown = false;

  function renderListView() {
    if (!barangayList) return;
    var filtered = activeFilter === 'All'
      ? barangays
      : barangays.filter(function (b) { return b.risk === activeFilter; });

    if (!filtered.length) {
      barangayList.innerHTML = '<p class="list-empty">No barangays match this filter.</p>';
      return;
    }

    var items = filtered.map(function (b, i) {
      var cfg = cfgOf(b.risk);
      return '<li>' +
        '<button type="button" class="list-item-btn' + (selectedKey === b.k ? ' is-selected' : '') + '" data-list-id="' + escHtml(b.id) + '">' +
          '<span class="list-num">' + (i + 1) + '</span>' +
          '<span class="list-name">' + escHtml(b.name) + '</span>' +
          '<span class="list-risk list-risk--' + cfg.css + '">' +
            '<svg width="16" height="16" viewBox="-14 -14 28 28" aria-hidden="true" focusable="false">' + markerShape(b.risk, 10) + '</svg>' +
            escHtml(cfg.short) +
          '</span>' +
        '</button>' +
      '</li>';
    }).join('');

    barangayList.innerHTML =
      '<p class="list-summary">' + filtered.length + ' of ' + barangays.length + ' barangays. Select one to zoom to it on the map.</p>' +
      '<ul class="barangay-list">' + items + '</ul>';
  }

  if (barangayList) {
    barangayList.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-list-id]') : null;
      if (!t) return;
      var id = t.getAttribute('data-list-id');
      barangays.forEach(function (b) {
        if (b.id === id) {
          showDetails(b);
          zoomInTo(b);
          if (listShown) { renderListView(); }
          mapWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  if (showListBtn && barangayList) {
    showListBtn.addEventListener('click', function () {
      listShown = !listShown;
      barangayList.classList.toggle('visible', listShown);
      showListBtn.classList.toggle('is-open', listShown);
      showListBtn.setAttribute('aria-expanded', listShown ? 'true' : 'false');
      var text = showListBtn.querySelector('.show-list-text');
      if (text) { text.textContent = listShown ? 'Hide list' : 'Show as list'; }
      if (listShown) { renderListView(); }
    });
  }

  var filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      activeFilter = pill.dataset.risk || 'All';
      filterPills.forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      renderAreas();
      renderMarkers();
      if (listShown) { renderListView(); }
    });
  });

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function iconSvg(risk, px) {
    return '<svg viewBox="-14 -14 28 28" aria-hidden="true" focusable="false" ' +
      'style="width:' + px + 'px !important;height:' + px + 'px !important;max-width:none !important;display:block;">' +
      markerShape(risk, 10) + '</svg>';
  }

  function buildLegend() {
    var order = ['High', 'Moderate', 'Low', 'Not yet assessed'];
    var counts = {};
    order.forEach(function (r) { counts[r] = 0; });
    barangays.forEach(function (b) {
      var k = RISK_CONFIG[b.risk] ? b.risk : 'Not yet assessed';
      counts[k] += 1;
    });

    var list = document.querySelector('#map-legend .legend-list');
    if (list) {
      list.innerHTML = order.map(function (r) {
        var cfg = cfgOf(r);
        return '<li class="legend-item">' +
          '<span class="legend-marker" aria-hidden="true">' + iconSvg(r, 24) + '</span>' +
          '<span class="legend-text"><strong>' + escHtml(cfg.label) + '</strong>' +
          '<small>' + cfg.shape + ' marker</small></span>' +
          '<span class="legend-count">' + counts[r] + '</span>' +
        '</li>';
      }).join('');
    }

    var note = document.querySelector('#map-legend > p');
    if (note) {
      note.textContent = 'Each barangay is shaded by its risk level and has a shape marker at its center. Hover for the name, click for details. Color is never the only indicator.';
    }

    document.querySelectorAll('.filter-pill').forEach(function (pill) {
      var risk = pill.dataset.risk;
      var count = (risk === 'All') ? barangays.length : counts[risk];

      if (risk && RISK_CONFIG[risk]) {
        var old = pill.querySelector('span[aria-hidden="true"]');
        var holder = document.createElement('span');
        holder.setAttribute('aria-hidden', 'true');
        holder.style.cssText = 'display:inline-flex;width:18px;height:18px;';
        holder.innerHTML = iconSvg(risk, 18);
        if (old) { pill.replaceChild(holder, old); } else { pill.insertBefore(holder, pill.firstChild); }
      }

      if (count !== undefined && !pill.querySelector('.pill-count')) {
        var badge = document.createElement('span');
        badge.className = 'pill-count';
        badge.textContent = count;
        pill.appendChild(badge);
      }
    });
  }

  buildLegend();
  renderAreas();
  renderMarkers();
  renderListView();

})();