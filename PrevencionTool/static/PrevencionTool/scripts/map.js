// initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([-17.3894997, -66.1567993], 6);
L.esri.basemapLayer('Streets').addTo(map);

var backgroundColor="#1E90FF"
var data=JSON.parse(JSON.stringify(countriesGeoJson));
var municipalitiesData=JSON.parse(JSON.stringify(municipalitiesGeoJson));
var departmentData=JSON.parse(JSON.stringify(departmentsGeoJson));
var feminicidiosData=JSON.parse(JSON.stringify(feminicidios));
console.log(municipalitiesData);
console.log(feminicidiosData);
var departamentsArray=["Nacional","La Paz","Santa Cruz", "Cochabamba","Tarija","Potosí","Oruro","Chuquisaca","Beni","Pando"];
var option = '';
var dropdownLayer_active;

// add GeoJSON layer to the map once the file is loaded

var arrayFeaturesCountries=data.features;
var country="Bolivia"
var index=arrayFeaturesCountries.findIndex(x => x.properties.name==country);

//Deleting the other countries and only leaving BOLIVIA as the main one//
while(index!=data.features.length-1){
  data.features.pop();
}
while (data.features.length!=1){
  data.features.shift()
}

//Add the geojson File to the Map to see the Whole country
dropdownLayer_active=L.geoJson(data,{style: function(feature){

    var fillColor=backgroundColor;
    return { color: "#999", weight: 10, fillColor: fillColor, fillOpacity: 0.02  };
  }
});
dropdownLayer_active.addTo(map)


// MAKING THE DROPDOWN MENU// when selecting other
for (var i=0;i<departamentsArray.length;i++){
   option += '<option value="'+ departamentsArray[i] + '">' + departamentsArray[i] + '</option>';
}
$('#departmentList').append(option);

//ADDING THE CLICK EVENT TO THE DROPDOWN MENU, SO ONE CAN SELECT IT//
$('#departmentList').on("click change", function(e){
  if(e.target.text!=undefined){
    e.preventDefault();
    var department=e.target.text;
    if(typeof (e.target.text) != 'undefined'){
      // chooseCountry(country,backgroundColor);
      console.log(department);
      displayDepartment(department);
      addDropdown(department,"sideSmall",municipalitiesData,"prov");
    }
    else{
      console.log('The country selected is undefined ');
    }
  }
});



addFeminicidiosData();
//ADDING THE FEMINICIDIOS DATA TO THE MAP//
function addFeminicidiosData(){
  let iconURL='https://img.icons8.com/officexs/48/000000/circled-user-female-skin-type-1-2.png';
  let womenIcon = L.icon({
    iconUrl:iconURL,
  	iconSize: [16,16],
  });


  for(let i=0; i<feminicidiosData.victimas.length; ++i){
    // console.log(i);
    let lat=feminicidiosData.victimas[i].lat;
    let long=feminicidiosData.victimas[i].long;
    let point=[];
    let template = '<h3>'+ feminicidiosData.victimas[i].nombre_victima +'</h3>\
        <table class="popup-table">\
          <tr class="popup-table-row">\
            <th class="popup-table-header"> Año </th>\
            <td id="value-ano" class="popup-table-data">'+feminicidiosData.victimas[i].ano_muerte+'</td>\
          </tr>\
          <tr class="popup-table-row">\
            <th class="popup-table-header">Mes Muerte:</th>\
            <td id="value-mes" class="popup-table-data">'+feminicidiosData.victimas[i].mes_muerte+'</td>\
          </tr>\
          <tr class="popup-table-row">\
            <th class="popup-table-header"> Fecha: </th>\
            <td id="value-fecha" class="popup-table-data">'+feminicidiosData.victimas[i].fecha_muerte+'</td>\
          </tr>\
          <tr class="popup-table-row">\
            <th class="popup-table-header">Departamento: </th>\
            <td id="value-departmento" class="popup-table-data">'+feminicidiosData.victimas[i].departmento+'</td>\
          </tr>\
          <tr class="popup-table-row">\
            <th class="popup-table-header"> Edad: </th>\
            <td id="value-edad" class="popup-table-data">'+feminicidiosData.victimas[i].edad_victima+'</td>\
          </tr>\
          <tr class="popup-table-row">\
            <th class="popup-table-header">Agresion Previa: </th>\
            <td id="value-agresion_previa" class="popup-table-data">'+feminicidiosData.victimas[i].agesion_previa+'</td>\
          </tr>\
          <tr class="popup-table-row">\
            <th class="popup-table-header">Estado del Caso: </th>\
            <td id="value-agresion_previa" class="popup-table-data">'+feminicidiosData.victimas[i].estado_del_caso+'</td>\
          </tr>\
        </table>\
        <br><strong>Circusntacias del Feminicidio</strong><br>'+feminicidiosData.victimas[i].circunstancias;
    if(lat != "No se sabe" && long!="No se sabe"){
      point.push(parseFloat(lat));
      point.push(parseFloat(long));
      let marker=L.marker(point,{icon:womenIcon}).addTo(map);
      marker.bindPopup(template);

    }
    // console.log(point);
  }
}

//ADDING THE SECOND DROPDOWN MENU OF THE PROVINCIAS UNDER THE DEPARTMENT DROPDOWN MENU//
function addDropdown(boundary,divElement,dataBoundary,type){
  cleanDropdown("provsList");
   let elementFather=document.getElementById(divElement);
   let x = document.createElement("SELECT");
   x.setAttribute("id", "provsList");
   elementFather.appendChild(x);
   let option='';
   // let copy=JSON.parse(JSON.stringify(provinciasData));
   //Find only the provincias in the department selected//
   if(type=="municipio"){
     var selected_boundary = dataBoundary.features.filter(x => {
       return x.properties.DEPARTAMEN=== boundary;
     })
   }
   else{
     // console.log("i am here");
     // console.log(dataBoundary);
     // console.log(boundary);
     var selected_boundary = dataBoundary.features.filter(x => {
       return x.properties.DEPARTAMEN=== boundary;
     });
     // console.log(selected_boundary);
     let arrays=[];
     for(let i=0; i< selected_boundary.length; ++i){
       if (arrays.indexOf(selected_boundary[i].properties.PROVINCIA) === -1) arrays.push(selected_boundary[i].properties.PROVINCIA);
     };
     // console.log(arrays);
     for(let i=0; i<arrays.length; ++i){
       option += '<option value="'+ arrays[i]+ '">' + arrays[i] + '</option>';
     }
     // console.log(option);
     $('#provsList').append(option);
   }

}
function cleanDropdown(divElement){
  let div=document.getElementById(divElement);
  console.log(div);
  if(div!=null){
    console.log("hola");
    div.options.length=0;
    div.parentNode.removeChild(div);
  }
}


//**FUNCTION TO DISPLAY A GIVING DEPARTMENT WHEN CLICKING ON THE DROPDOWN MENU**//
function displayBoundary(boundaryInput,boundaryData){
  map.removeLayer(dropdownLayer_active);
  let copy;
  console.log(map);
  if(boundaryInput !="Nacional"){
    copy=JSON.parse(JSON.stringify(boundaryData));
    var selected_boundary = copy.features.filter(x => {
      return x.properties.DEPARTAMEN=== boundaryInput;
    });
    copy.features=selected_boundary;
    //Add the Departments to the Map
    dropdownLayer_active=L.geoJson(copy,{style: function(feature){
        var fillColor=backgroundColor;
        return { color: "#999", weight: 5, fillColor: fillColor, fillOpacity: 0.02  };
      }
    });
  }
  else{
    //Add the geojson File to the Map
    dropdownLayer_active=L.geoJson(data,{style: function(feature){
        var fillColor=backgroundColor;
        return { color: "#999", weight: 10, fillColor: fillColor, fillOpacity: 0.02  };
      }
    });
  }
  dropdownLayer_active.addTo(map)
}


//**FUNCTION TO DISPLAY A GIVING DEPARTMENT WHEN CLICKING ON THE DROPDOWN MENU**//
function displayDepartment(departmentInput){
  map.removeLayer(dropdownLayer_active);
  let departmentDataCopy;
  // console.log(map);
  if(departmentInput !="Nacional"){
    departmentDataCopy=JSON.parse(JSON.stringify(departmentData));
    var selected_department = departmentDataCopy.features.filter(x => {
      return x.properties.DEPARTAMEN=== departmentInput;
    });
    departmentDataCopy.features=selected_department;
    //Add the Departments to the Map
    dropdownLayer_active=L.geoJson(departmentDataCopy,{style: function(feature){
        var fillColor=backgroundColor;
        return { color: "#999", weight: 5, fillColor: fillColor, fillOpacity: 0.02  };
      }
    });
  }
  else{
    //Add the geojson File to the Map
    dropdownLayer_active=L.geoJson(data,{style: function(feature){
        var fillColor=backgroundColor;
        return { color: "#999", weight: 10, fillColor: fillColor, fillOpacity: 0.02  };
      }
    });
  }
  dropdownLayer_active.addTo(map);
  map.fitBounds(dropdownLayer_active.getBounds());
  map.zoomIn(2);
}


//Add the Municipalities to the Map

// console.log(municipalitiesData.features);
// var municpalities_by_department = municipalitiesData.features.filter(x => {
//   return x.properties.DEPARTAMEN=== "Santa Cruz"
// })
// let arrays=[];
// for(let i=0; i< municpalities_by_department.length; ++i){
//   if (arrays.indexOf(municpalities_by_department[i].properties.PROVINCIA) === -1) arrays.push(municpalities_by_department[i].properties.PROVINCIA);
// };
// console.log(arrays);
// municipalitiesData.features=municpalities_by_department;
// console.log(municpalities_by_department);
// for(){
//
// }
// if(municipalitiesData.features){
//
//
// }
var municipalities=L.geoJson(municipalitiesData,{style: function(feature){
    var fillColor=backgroundColor;
    return { color: "#999", weight: 2, fillColor: fillColor, fillOpacity: 0.01  };
  }
});
// municipalities.addTo(map);


// prov.addTo(map)
