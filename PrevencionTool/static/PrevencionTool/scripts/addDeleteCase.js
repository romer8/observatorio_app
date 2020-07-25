
  var currentDate = new Date();
  var tomorrowDate= currentDate.getDate() + 1;
  PICKER = datepicker('#single-datepicker-input', {dateSelected: currentDate},{maxDate: tomorrowDate});
  $(function(){


    var $select = $(".1-100");
    for (i=0;i<=100;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
    // $('#datetimepicker6').datepicker(new Date());
    // $('#datetimepicker6').datepicker('setStartDate', dateUTC_start);
    // $('#datetimepicker6').datepicker('setEndDate', new Date());
    // $("#datetimepicker6").on("changeDate", function (e) {
    //   console.log("changing time");
    //   $('#datetimepicker6').datepicker('update', $(this).datepicker('getDate'));
    // });

  });
  var provActiveLayer;
  var caseToAddGeolocalizacion;
  var MyCustomMarker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(12, 12),
      iconSize: new L.Point(24, 24),
      iconUrl: 'https://img.icons8.com/nolan/64/coffin.png'
    }
  });
  var center = [-17.3894997, -66.1567993];
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
          map2 = new L.Map('mapAddCase', { center: center, zoom: 13 }),
          drawnItems = L.featureGroup().addTo(map2);
  L.control.layers({
      'Vista Normal': osm.addTo(map2),
      "Vista Satelital": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
          attribution: 'google'
      }),
  }, { 'Casos Anadido': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map2);
  map2.addControl(new L.Control.Draw({
      edit: {
          featureGroup: drawnItems,
          poly: {
              allowIntersection: false
          }
      },
      draw: {
          polyline:false,
          polygon: false,
          circle:false,
          rectangle:false,
          circlemarker:false,
          marker: {
            icon: new MyCustomMarker()
          }
      }
  }));

  map2.on(L.Draw.Event.CREATED, function (event) {
      var layer = event.layer;
      drawnItems.addLayer(layer);
      L.Draw.Event.STOP;
      caseToAddGeolocalizacion=`${layer['_latlng']['lat']},${layer['_latlng']['lng']}`
      console.log(caseToAddGeolocalizacion);
  });


  //departments list display boundary//
  var displayBoundary = function(activeDept,departmentObject){
    departmentObject.forEach(function(x){
      if(x.boundary ==activeDept){
        map2.setView([x['lat'],x['long']],x['zoomLevel']);
      }
    })
  };

  //MAKING the second dropdown for the porvinces //
  makeSecondDropDown=function(dept){
    document.getElementById('provinceList2').options.length = 0;
    let option = '';
    departmentProvObjectArray.forEach(function(x){
      if(x['boundary']==dept && dept != "Nacional"){
        for (let i=0;i<x['provinces'].length;i++){
           option += '<option value="'+ x['provinces'][i] + '">' + x['provinces'][i] + '</option>';
        }
        $('#provinceList2').append(option);
      }
    })
    if(dept=="Nacional"){
      let option=''
      departmentProvObjectArray.forEach(function(x){
        if(x.boundary != "Nacional"){
          for (let i=0;i<x['provinces'].length;i++){
             option += '<option value="'+ x['provinces'][i] + '">' + x['provinces'][i] + '</option>';
          }
        }
      })
      $('#provinceList2').append(option);

    }
  };

  makesDropdowns = function(){
    let option = '';
    // MAKING THE DROPDOWN MENU// when selecting other
    for (let i=0;i<departmentProvObjectArray.length;i++){
       option += '<option value="'+ departmentProvObjectArray[i]['boundary'] + '">' + departmentProvObjectArray[i]['boundary'] + '</option>';
    }
    $('#departmentList2').append(option);
    $('#departmentList3').append(option);
    option=''
    departmentProvObjectArray.forEach(function(x){
      if(x.boundary != "Nacional"){
        for (let i=0;i<x['provinces'].length;i++){
           option += '<option value="'+ x['provinces'][i] + '">' + x['provinces'][i] + '</option>';
        }
      }
    })
    $('#provinceList2').append(option);
    $('#provinceList3').append(option);
  }


  makesDropdowns();
  //ADDING THE CLICK EVENT TO THE DROPDOWN MENU, SO ONE CAN SELECT IT//
  $('#departmentList2').on("click change", function(e){
    if(e.target.text!=undefined){
      e.preventDefault();
      let department=e.target.text;
      if(typeof (e.target.text) != 'undefined'){
        // chooseCountry(country,backgroundColor);
        console.log(department);
        // displayDepartment(department);
        displayBoundary(department, departmentProvObjectArray);
        // cleanDropdown("provinceList2");

        makeSecondDropDown(department)
        // addDropdown(department,"sideSmall",municipalitiesData,"prov");
        // makegraph(department);
        // makePieGrap(department);
      }
      else{
        console.log('The country selected is undefined ');
      }
    }
  });
  addProvinceBoundary = function(prov){
    $.ajax({
      url: "https://geoserver.hydroshare.org/geoserver/HS-5f0bfe9647de4f778be9857ed3433f22/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=HS-5f0bfe9647de4f778be9857ed3433f22%3Aprovincias&maxFeatures=200&outputFormat=application%2Fjson",
      success: function(result){
        featuresArray= result['features'];
        featuresArray.forEach(function(feature){
          let featurePropName=feature['properties']['NOM_PROV'];
          if(featurePropName == prov){
            console.log(provActiveLayer);
            if( provActiveLayer !=undefined){
              console.log("the layer is undefined");
              map2.removeLayer(provActiveLayer);
            }
            provActiveLayer = L.geoJson(feature);
            provActiveLayer.addTo(map2);
            console.log(typeof(provActiveLayer.getBounds()));
            map2.fitBounds(provActiveLayer.getBounds());
          }
        })

      }
    });
  }
  $('#provinceList2').on("click change", function(e){
    if(e.target.text!=undefined){
      e.preventDefault();
      let province=e.target.text;
      if(typeof (e.target.text) != 'undefined'){
        // chooseCountry(country,backgroundColor);
        console.log(province);
        // displayDepartment(department);
        addProvinceBoundary(province);

      }
      else{
        console.log('The country selected is undefined ');
      }
    }
  });
