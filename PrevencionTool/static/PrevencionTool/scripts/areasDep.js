

//clean Dropdown
let cleanDropdown = function (divElement){
  let div=document.getElementById(divElement);
  if(div!=null){
    div.options.length=0;
    div.parentNode.removeChild(div);
  }
}

var departmentProvObjectArray=[
  {boundary:'Nacional',
    zoomLevel:6,
    lat:-17.3894997,
    long:-66.1567993,
  },
  {boundary:'La Paz',
    zoomLevel:12,
    lat:-16.502705,
    long:-68.160786,
    provinces:[
      "Abel Iturralde",
      "Aroma",
      "Bautista Saavedra",
      "Caranavi",
      "Eliodoro Camacho",
      "Franz Tamayo",
      "Gualberto Villarroel",
      "Ingavi",
      "Inquisivi",
      "José Manuel Pando",
      "Larecaja",
      "Loayza",
      "Los Andes",
      "Manco Kapac",
      "Muñecas",
      "Nor Yungas",
      "Omasuyos",
      "Pacajes",
      "Murillo",
      "Sud Yungas"
    ]
  },
  {boundary:'Cochabamba',
    zoomLevel:12,
    lat:-17.413700,
    long:-66.151339,
    provinces:[
      "Arani",
      "Arque",
      "Ayopaya",
      "Capinota",
      "Carrasco",
      "Cercado",
      "Chapare",
      "Esteban Arce",
      "Germán Jordán",
      "Mizque",
      "Campero",
      "Punata",
      "Quillacollo",
      "Bolívar",
      "Tapacarí",
      "Tiraque"
    ]
  },
  {boundary:'Santa Cruz',
    lat:-1,
    long:7.813157,
    zoomLevel:10,
    long:-63.169639,
    provinces:[
      "Andrés Ibáñez",
      "Ángel Sandoval",
      "Chiquitos",
      "Cordillera",
      "Florida",
      "Germán Busch",
      "Guarayos",
      "Ichilo",
      "Ignacio Warnes",
      "José Miguel de Velasco",
      "Manuel María Caballero",
      "Ñuflo de Chávez",
      "Obispo Santistevan",
      "Sara",
      "Vallegrande"
    ]
  },
  {boundary:'Tarija',
    zoomLevel:12,
    lat:-21.519863,
    long:-64.729898,
    provinces:[
      "Aniceto Arce",
      "Burnet O'Connor",
      "Cercado",
      "Eustaquio Méndez",
      "Gran Chaco",
      "José María Avilés"
    ]
  },
  {boundary:'Potosí',
    lat:-19.578493,
    zoomLevel:12,
    long:-65.752852,
    provinces:[
      "Alonso de Ibáñez",
      "Antonio Quijarro",
      "Bernardino Bilbao",
      "Cornelio Saavedra",
      "Daniel Campos",
      "Enrique Baldivieso",
      "José María Linares",
      "Modesto Omiste",
      "Nor Chichas",
      "Nor Lípez",
      "Rafael Bustillo",
      "Sur Chichas",
      "Sur Lípez",
      "Tomás Frías"
    ]
  },
  {boundary:'Oruro',
    zoomLevel:12,
    lat:-17.973250,
    long:-67.093894,
    provinces:[
      "Atahuallpa",
      "Carangas",
      "Cercado",
      "Eduardo Avaroa",
      "Ladislao Cabrera",
      "Litoral",
      "Nor Carangas",
      "Pantaléon Dalence",
      "Lago Poopó",
      "Puerto de Mejillones",
      "Sajama",
      "San Pedro de Totora",
      "Saucarí",
      "Sebastián Pagador",
      "Sud Carangas",
      "Tomas Barrón"
    ]
  },
  {boundary:'Beni',
    zoomLevel:12,
    lat:-14.834720,
    long:-64.901999,
    provinces:[
      "Cercado",
      "Iténez",
      "José Ballivián",
      "Mamoré",
      "Marbán",
      "Moxos",
      "Vaca Díez",
      "Yacuma"
    ]

  },
  {boundary:'Pando',
    zoomLevel:12,
    lat:-11.029391,
    long:-68.766984,
    provinces:[
      "Abuná",
      "Federico Román",
      "Madre de Dios",
      "Manuripi",
      "Nicolás Suárez"
    ]
  },
  {boundary:'Chuquisaca',
    zoomLevel:12,
    lat:-19.035578,
    long:-65.257393,
    provinces:[
      "Azurduy",
      "Belisario Boeto",
      "Hernando Siles",
      "Jaime Zudáñez",
      "Luis Calvo",
      "Nor Cinti",
      "Oropeza",
      "Sud Cinti",
      "Tomina",
      "Yamparáez"
    ]
  },
];
