// // initialize the map on the "map" div with a given center and zoom
// var map = L.map('map').setView([-17.3894997, -66.1567993], 6);
// L.esri.basemapLayer('Streets').addTo(map);
//
// var backgroundColor="#1E90FF"
// var data=JSON.parse(JSON.stringify(countriesGeoJson));
// var municipalitiesData=JSON.parse(JSON.stringify(municipalitiesGeoJson));
// var departmentData=JSON.parse(JSON.stringify(departmentsGeoJson));
// var feminicidiosData=JSON.parse(JSON.stringify(feminicidios));
// var departmentObjectArray=[
//   {boundary:'Nacional',
//     zoomLevel:6,
//     lat:-17.3894997,
//     long:-66.1567993
//   },
//   {boundary:'La Paz',
//     zoomLevel:14,
//     lat:-16.502705,
//     long:-68.160786
//   },
//   {boundary:'Cochabamba',
//     zoomLevel:14,
//     lat:-17.413700,
//     long:-66.151339
//   },
//   {boundary:'Santa Cruz',
//     lat:-17.813157,
//     zoomLevel:14,
//     long:-63.169639
//   },
//   {boundary:'Tarija',
//     zoomLevel:14,
//     lat:-21.519863,
//     long:-64.729898
//   },
//   {boundary:'Potosí',
//     lat:-19.578493,
//     zoomLevel:14,
//     long:-65.752852
//   },
//   {boundary:'Oruro',
//     zoomLevel:14,
//     lat:-17.973250,
//     long:-67.093894
//   },
//   {boundary:'Beni',
//     zoomLevel:14,
//     lat:-14.834720,
//     long:-64.901999
//   },
//   {boundary:'Pando',
//     zoomLevel:14,
//     lat:-11.029391,
//     long:-68.766984
//   },
//   {boundary:'Chuquisaca',
//     zoomLevel:14,
//     lat:-19.035578,
//     long:-65.257393
//   },
//
// ]
// var option = '';
// var dropdownLayer_active;
//
// // add GeoJSON layer to the map once the file is loaded
//
// var arrayFeaturesCountries=data.features;
// var country="Bolivia"
// var index=arrayFeaturesCountries.findIndex(x => x.properties.name==country);
//
// //Deleting the other countries and only leaving BOLIVIA as the main one//
// while(index!=data.features.length-1){
//   data.features.pop();
// }
// while (data.features.length!=1){
//   data.features.shift()
// }
//
// //Add the geojson File to the Map to see the Whole country
// dropdownLayer_active=L.geoJson(data,{style: function(feature){
//
//     var fillColor=backgroundColor;
//     return { color: "#999", weight: 10, fillColor: fillColor, fillOpacity: 0.02  };
//   }
// });
// dropdownLayer_active.addTo(map)
//
//
// // MAKING THE DROPDOWN MENU// when selecting other
// for (var i=0;i<departmentObjectArray.length;i++){
//    option += '<option value="'+ departmentObjectArray[i]['boundary'] + '">' + departmentObjectArray[i]['boundary'] + '</option>';
// }
// $('#departmentList').append(option);
//
// //ADDING THE CLICK EVENT TO THE DROPDOWN MENU, SO ONE CAN SELECT IT//
// $('#departmentList').on("click change", function(e){
//   if(e.target.text!=undefined){
//     e.preventDefault();
//     var department=e.target.text;
//     if(typeof (e.target.text) != 'undefined'){
//       // chooseCountry(country,backgroundColor);
//       console.log(department);
//       // displayDepartment(department);
//       displayBoundary(department, departmentData);
//       addDropdown(department,"sideSmall",municipalitiesData,"prov");
//     }
//     else{
//       console.log('The country selected is undefined ');
//     }
//   }
// });
//
//
//
// addFeminicidiosData();
// //ADDING THE FEMINICIDIOS DATA TO THE MAP//
// function addFeminicidiosData(){
//   let iconURL='https://img.icons8.com/material-rounded/24/000000/female.png';
//   let womenIcon = L.icon({
//     iconUrl:iconURL,
//   	iconSize: [16,16],
//   });
//
//
//   for(let i=0; i<feminicidiosData.victimas.length; ++i){
//     // console.log(i);
//     let lat=feminicidiosData.victimas[i].lat;
//     let long=feminicidiosData.victimas[i].long;
//     let point=[];
//     let template = '<h3>'+ feminicidiosData.victimas[i].nombre_victima +'</h3>\
//         <table class="popup-table">\
//           <tr class="popup-table-row">\
//             <th class="popup-table-header"> Año </th>\
//             <td id="value-ano" class="popup-table-data">'+feminicidiosData.victimas[i].ano_muerte+'</td>\
//           </tr>\
//           <tr class="popup-table-row">\
//             <th class="popup-table-header">Mes Muerte:</th>\
//             <td id="value-mes" class="popup-table-data">'+feminicidiosData.victimas[i].mes_muerte+'</td>\
//           </tr>\
//           <tr class="popup-table-row">\
//             <th class="popup-table-header"> Fecha: </th>\
//             <td id="value-fecha" class="popup-table-data">'+feminicidiosData.victimas[i].fecha_muerte+'</td>\
//           </tr>\
//           <tr class="popup-table-row">\
//             <th class="popup-table-header">Departamento: </th>\
//             <td id="value-departmento" class="popup-table-data">'+feminicidiosData.victimas[i].departmento+'</td>\
//           </tr>\
//           <tr class="popup-table-row">\
//             <th class="popup-table-header"> Edad: </th>\
//             <td id="value-edad" class="popup-table-data">'+feminicidiosData.victimas[i].edad_victima+'</td>\
//           </tr>\
//           <tr class="popup-table-row">\
//             <th class="popup-table-header">Agresion Previa: </th>\
//             <td id="value-agresion_previa" class="popup-table-data">'+feminicidiosData.victimas[i].agesion_previa+'</td>\
//           </tr>\
//           <tr class="popup-table-row">\
//             <th class="popup-table-header">Estado del Caso: </th>\
//             <td id="value-agresion_previa" class="popup-table-data">'+feminicidiosData.victimas[i].estado_del_caso+'</td>\
//           </tr>\
//         </table>\
//         <br><strong>Circusntacias del Feminicidio</strong><br>'+feminicidiosData.victimas[i].circunstancias;
//     if(lat != "No se sabe" && long!="No se sabe"){
//       point.push(parseFloat(lat));
//       point.push(parseFloat(long));
//       let marker=L.marker(point,{icon:womenIcon}).addTo(map);
//       marker.bindPopup(template);
//
//     }
//     // console.log(point);
//   }
// }
//
// //ADDING THE SECOND DROPDOWN MENU OF THE PROVINCIAS UNDER THE DEPARTMENT DROPDOWN MENU//
// function addDropdown(boundary,divElement,dataBoundary,type){
//   cleanDropdown("provsList");
//    let elementFather=document.getElementById(divElement);
//    let x = document.createElement("SELECT");
//    x.setAttribute("id", "provsList");
//    elementFather.appendChild(x);
//    let option='';
//    // let copy=JSON.parse(JSON.stringify(provinciasData));
//    //Find only the provincias in the department selected//
//    if(type=="municipio"){
//      var selected_boundary = dataBoundary.features.filter(x => {
//        return x.properties.DEPARTAMEN=== boundary;
//      })
//    }
//    else{
//      // console.log("i am here");
//      // console.log(dataBoundary);
//      // console.log(boundary);
//      var selected_boundary = dataBoundary.features.filter(x => {
//        return x.properties.DEPARTAMEN=== boundary;
//      });
//      // console.log(selected_boundary);
//      let arrays=[];
//      for(let i=0; i< selected_boundary.length; ++i){
//        if (arrays.indexOf(selected_boundary[i].properties.PROVINCIA) === -1) arrays.push(selected_boundary[i].properties.PROVINCIA);
//      };
//      // console.log(arrays);
//      for(let i=0; i<arrays.length; ++i){
//        option += '<option value="'+ arrays[i]+ '">' + arrays[i] + '</option>';
//      }
//      // console.log(option);
//      $('#provsList').append(option);
//    }
//
// }
// function cleanDropdown(divElement){
//   let div=document.getElementById(divElement);
//   console.log(div);
//   if(div!=null){
//     console.log("hola");
//     div.options.length=0;
//     div.parentNode.removeChild(div);
//   }
// }
//
//
// //**FUNCTION TO DISPLAY A GIVING DEPARTMENT WHEN CLICKING ON THE DROPDOWN MENU**//
// function displayBoundary(boundaryInput,boundaryData){
//   map.removeLayer(dropdownLayer_active);
//   let copy;
//   console.log(map);
//   if(boundaryInput !="Nacional"){
//     copy=JSON.parse(JSON.stringify(boundaryData));
//     var selected_boundary = copy.features.filter(x => {
//       return x.properties.DEPARTAMEN=== boundaryInput;
//     });
//     copy.features=selected_boundary;
//     //Add the Departments to the Map
//     dropdownLayer_active=L.geoJson(copy,{style: function(feature){
//         var fillColor=backgroundColor;
//         return { color: "#999", weight: 5, fillColor: fillColor, fillOpacity: 0.02  };
//       }
//     });
//   }
//   else{
//     //Add the geojson File to the Map
//     dropdownLayer_active=L.geoJson(data,{style: function(feature){
//         var fillColor=backgroundColor;
//         return { color: "#999", weight: 10, fillColor: fillColor, fillOpacity: 0.02  };
//       }
//     });
//   }
//   dropdownLayer_active.addTo(map);
//   let departmentObject=departmentObjectArray.filter(x => {
//     return x.boundary=== boundaryInput;
//   });
//   console.log(departmentObject);
//   console.log(departmentObject['lat']);
//   console.log(departmentObject['long']);
//   map.setView([departmentObject[0]['lat'],departmentObject[0]['long']],departmentObject[0]['zoomLevel']);
// }
//
//
// //**FUNCTION TO DISPLAY A GIVING DEPARTMENT WHEN CLICKING ON THE DROPDOWN MENU**//
// function displayDepartment(departmentInput){
//   map.removeLayer(dropdownLayer_active);
//   let departmentDataCopy;
//   // console.log(map);
//   if(departmentInput !="Nacional"){
//     departmentDataCopy=JSON.parse(JSON.stringify(departmentData));
//     var selected_department = departmentDataCopy.features.filter(x => {
//       return x.properties.DEPARTAMEN=== departmentInput;
//     });
//     departmentDataCopy.features=selected_department;
//     //Add the Departments to the Map
//     dropdownLayer_active=L.geoJson(departmentDataCopy,{style: function(feature){
//         var fillColor=backgroundColor;
//         return { color: "#999", weight: 5, fillColor: fillColor, fillOpacity: 0.02  };
//       }
//     });
//   }
//   else{
//     //Add the geojson File to the Map
//     dropdownLayer_active=L.geoJson(data,{style: function(feature){
//         var fillColor=backgroundColor;
//         return { color: "#999", weight: 10, fillColor: fillColor, fillOpacity: 0.02  };
//       }
//     });
//   }
//   dropdownLayer_active.addTo(map);
//   map.fitBounds(dropdownLayer_active.getBounds());
//   map.zoomIn(2);
// }
//
//
// //Add the Municipalities to the Map
//
// var municipalities=L.geoJson(municipalitiesData,{style: function(feature){
//     var fillColor=backgroundColor;
//     return { color: "#999", weight: 2, fillColor: fillColor, fillOpacity: 0.01  };
//   }
// });
// // municipalities.addTo(map);


/*=============================================================================
* FILE:   FeminicidiosLocos.js
* AUTHOR: Giovanni Romero
* DATE:   01/01/2020
*
* DESCRIPTION: Front-end to display feminicidios data
*/
const FeminicidiosPackage=(function(){
  "use strict"
      /*-----------------------------------------------------------------
       *                   CONSTANT
       */

       /*-----------------------------------------------------------------
        *                  PRIVATE VARIABLE
        */
        let map;
        let backgroundColor="#1E90FF";
        let data;
        let municipalitiesData;
        let departmentData;
        let feminicidiosData;
        let departmentObjectArray=[];
        let dropdownLayer_active;
        let iconURL;
        let womenIcon;
        let buttonGraph;
        let graph;
       /*-----------------------------------------------------------------
        *                  PRIVATE METHOD DECLARATIONS
        */
        let init_map;
        let init_variables;
        let init_side;
        let addDropdown;
        let displayBoundary;
        let cleanDropdown;
        let addFeminicidiosData;
        let initialize;

       /*-----------------------------------------------------------------
        *                  PRIVATE METHODS
        */
        init_variables=function(){
          graph = chart_object;
          iconURL='https://img.icons8.com/material-rounded/24/000000/female.png';
          womenIcon = L.icon({
            iconUrl:iconURL,
            iconSize: [16,16],
          });
          data=JSON.parse(JSON.stringify(countriesGeoJson));
          municipalitiesData=JSON.parse(JSON.stringify(municipalitiesGeoJson));
          departmentData=JSON.parse(JSON.stringify(departmentsGeoJson));
          feminicidiosData=JSON.parse(JSON.stringify(feminicidios));
          departmentObjectArray=[
            {boundary:'Nacional',
              zoomLevel:6,
              lat:-17.3894997,
              long:-66.1567993
            },
            {boundary:'La Paz',
              zoomLevel:14,
              lat:-16.502705,
              long:-68.160786
            },
            {boundary:'Cochabamba',
              zoomLevel:14,
              lat:-17.413700,
              long:-66.151339
            },
            {boundary:'Santa Cruz',
              lat:-17.813157,
              zoomLevel:14,
              long:-63.169639
            },
            {boundary:'Tarija',
              zoomLevel:14,
              lat:-21.519863,
              long:-64.729898
            },
            {boundary:'Potosí',
              lat:-19.578493,
              zoomLevel:14,
              long:-65.752852
            },
            {boundary:'Oruro',
              zoomLevel:14,
              lat:-17.973250,
              long:-67.093894
            },
            {boundary:'Beni',
              zoomLevel:14,
              lat:-14.834720,
              long:-64.901999
            },
            {boundary:'Pando',
              zoomLevel:14,
              lat:-11.029391,
              long:-68.766984
            },
            {boundary:'Chuquisaca',
              zoomLevel:14,
              lat:-19.035578,
              long:-65.257393
            },

          ];
          buttonGraph=$('#boton');
          buttonGraph.on("click", function(e){
            if(graph==undefined){
              console.log("hola");
            }
          });

        }

        init_map= function(){
          map = L.map('map').setView([-17.3894997, -66.1567993], 6);
          L.esri.basemapLayer('Streets').addTo(map);
          init_variables();

          // add GeoJSON layer to the map once the file is loaded

          let arrayFeaturesCountries=data.features;
          let country="Bolivia"
          let index=arrayFeaturesCountries.findIndex(x => x.properties.name==country);

          //Deleting the other countries and only leaving BOLIVIA as the main one//
          while(index!=data.features.length-1){
            data.features.pop();
          }
          while (data.features.length!=1){
            data.features.shift()
          }

          //Add the geojson File to the Map to see the Whole country
          dropdownLayer_active=L.geoJson(data,{style: function(feature){

              let fillColor=backgroundColor;
              return { color: "#999", weight: 10, fillColor: fillColor, fillOpacity: 0.02  };
            }
          });
          dropdownLayer_active.addTo(map)
        }

        init_side= function(){
            console.log("inside the init_side function");
            let option = '';

            // MAKING THE DROPDOWN MENU// when selecting other
            for (let i=0;i<departmentObjectArray.length;i++){

               option += '<option value="'+ departmentObjectArray[i]['boundary'] + '">' + departmentObjectArray[i]['boundary'] + '</option>';
            }
            $('#departmentList').append(option);

            //ADDING THE CLICK EVENT TO THE DROPDOWN MENU, SO ONE CAN SELECT IT//
            $('#departmentList').on("click change", function(e){
              if(e.target.text!=undefined){
                e.preventDefault();
                let department=e.target.text;
                if(typeof (e.target.text) != 'undefined'){
                  // chooseCountry(country,backgroundColor);
                  console.log(department);
                  // displayDepartment(department);
                  displayBoundary(department, departmentData);
                  addDropdown(department,"sideSmall",municipalitiesData,"prov");
                }
                else{
                  console.log('The country selected is undefined ');
                }
              }
            });
          }
          //ADDING THE SECOND DROPDOWN MENU OF THE PROVINCIAS UNDER THE DEPARTMENT DROPDOWN MENU//
          addDropdown= function (boundary,divElement,dataBoundary,type){
            console.log("entering the dropdown function");
            cleanDropdown("provsList");
             let elementFather=document.getElementById(divElement);
             let x = document.createElement("SELECT");
             x.setAttribute("id", "provsList");
             elementFather.appendChild(x);
             // let buttonElement=document.createElement("button");
             // buttonElement.setAttribute("id","boton");
             // buttonElement.innerHTML='Graficos';
             let option='';
             // let copy=JSON.parse(JSON.stringify(provinciasData));
             //Find only the provincias in the department selected//
             if(type=="municipio"){
               let selected_boundary = dataBoundary.features.filter(x => {
                 return x.properties.DEPARTAMEN=== boundary;
               })
             }
             else{
               console.log("i am here");
               console.log(dataBoundary);
               console.log(boundary);
               let selected_boundary = dataBoundary.features.filter(x => {
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
               // elementFather.appendChild(buttonElement);
             }

          }
          cleanDropdown = function (divElement){
            let div=document.getElementById(divElement);
            // let div2=document.getElementById("sideSmall");
            // // if(){
            //   while (div2.childNodes.length>1) {
            //     console.log(div2.lastChild);
            //     div2.removeChild(div2.lastChild);
            //   }
            // }
            // console.log(div);
            if(div!=null){
              // console.log("hola");
              div.options.length=0;
              div.parentNode.removeChild(div);
              // div.parentNode.removeChild(div2);
            }
          }

          //**FUNCTION TO DISPLAY A GIVING DEPARTMENT WHEN CLICKING ON THE DROPDOWN MENU**//
          displayBoundary = function(boundaryInput,boundaryData){
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
            dropdownLayer_active.addTo(map);
            let departmentObject=departmentObjectArray.filter(x => {
              return x.boundary=== boundaryInput;
            });
            console.log(departmentObject);
            console.log(departmentObject['lat']);
            console.log(departmentObject['long']);
            map.setView([departmentObject[0]['lat'],departmentObject[0]['long']],departmentObject[0]['zoomLevel']);
          }

          addFeminicidiosData= function(){
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
          initialize= function(){
            init_variables();
            init_map();
            init_side();
            addFeminicidiosData();
          }

          /************************************************************************
           *                  INITIALIZATION / CONSTRUCTOR
           *************************************************************************/
          $(function() {
            initialize();
          })
}())// End of package wrapper
