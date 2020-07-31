from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from PrevencionTool.models import Victima, Agresor
from sklearn import datasets, linear_model, metrics
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
import os
import json
import csv
import pandas as pd
import numpy as np
import datetime
import plotly.graph_objs as go
import copy
from statistics import mean
# Create your views here.
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")
def feminicidios_data():
    # Victima.objects.all().delete()
    # Agresor.objects.all().delete()
    ## This initializes the db, so we do not have to be checking all the time ##
    if Victima.objects.count() > 0:
        print("we are not empty")
        # Victima.objects.get(nombre="mujer ejemplo").delete()
        # Victima.objects.get(nombre="TEST2").delete()
        # Victima.objects.get(nombre="TEST4").delete()
        # Victima.objects.get(nombre="TEST3").delete()
        # Victima.objects.get(nombre="ejmplo").delete()
        # Victima.objects.get(nombre="afhalfhalf").delete()
        # Victima.objects.get(nombre="hola hola").delete()
        # student_list = Victima.objects.all()
        # for student in student_list:
        #     print (student.nombre)
        return
    else:
        print("we are empty")
        Victima.objects.all().delete()
        Agresor.objects.all().delete()
        # array=[]
        count=0
        # csv_path="PrevencionTool/static/PrevencionTool/scripts/Bol_Feminicidio 2013-16 Clean_Full.csv"
        csv_path="PrevencionTool/static/PrevencionTool/scripts/Bol_Feminicidio 2013-16.csv"
        with open(csv_path, newline='') as csvfile:
            spamreader = csv.reader(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_ALL, skipinitialspace=True)
            print('Loading...')
            for row in spamreader:
                count=count+1
                ano_victima=row[0]
                mes_victima = row[1]
                fecha_victima = row[2]
                nombre_victima = row[3]
                edad_victima=row[4]
                lugar_victima=row[5]
                provincia_victima=row[6]
                departamento_victima=row[7]
                geolocalizacion_victima=row[8]
                circunstancias_victima=row[9]
                agresion_previa_victima=row[10]
                causa_muerte_victima=row[11]
                numero_hijos_victima=row[22]

                estado_del_caso=row[17]
                situacion_del_presunto_autor=row[18]

                nombre_acusado=row[12]
                edad_acusado=row[13]
                temperancia=row[14]
                intento_suicidio=row[15]
                relacion_victima=row[16]
                sentencia=row[19]
                fecha_sentencia=row[20]
                # count=count+1
                # ano_victima=row[1]
                # mes_victima = row[2]
                # fecha_victima = row[3]
                # nombre_victima = row[4]
                # edad_victima=row[5]
                # lugar_victima=row[6]
                # provincia_victima=row[7]
                # departamento_victima=row[8]
                # circunstancias_victima=row[9]
                # agresion_previa_victima=row[10]
                # causa_muerte_victima=row[11]
                # nombre_acusado=row[12]
                # edad_acusado=row[13]
                # intento_suicidio=row[14]
                # estado_del_caso=row[15]
                # situacion_del_presunto_autor=row[16]
                # sentencia=row[17]
                # fecha_sentencia=row[18]
                # numero_hijos_victima=row[19]
                # observaciones_victima = row[20]
                # enlaces_originales = row[21]
                # enlaces_validos = row[22]
                # lat_victima=row[23]
                # long_victima=row[24]
                # temperancia=row[25]
                # detalles_agresion_previa = row[26]
                # detalles_agresion_mortal = row[27]
                # detalles_relacion_victima = row[28]
                # relacion_victima=row[29]

                victima_row = Victima(

                    ano=ano_victima,
                    mes=mes_victima,
                    fecha=fecha_victima,
                    nombre=nombre_victima,
                    edad=edad_victima,
                    lugar=lugar_victima,
                    provincia=provincia_victima,
                    departamento=departamento_victima,
                    geolocalizacion=geolocalizacion_victima,
                    circunstancias=circunstancias_victima,
                    agresion_previa=agresion_previa_victima,
                    estado_del_caso=estado_del_caso,
                    causa_muerte=causa_muerte_victima,
                    numero_hijos=numero_hijos_victima
                )
                agresor_row=Agresor(
                    ano=ano_victima,
                    mes=mes_victima,
                    fecha=fecha_victima,
                    nombre_victima=nombre_victima,
                    nombre_acusado=nombre_acusado,
                    edad_acusado=edad_acusado,
                    temperancia=temperancia,
                    intento_suicidio=intento_suicidio,
                    relacion_victima=relacion_victima,
                    estado_del_caso=estado_del_caso,
                    situacion_del_presunto_autor=situacion_del_presunto_autor,
                    sentencia=sentencia,
                    fecha_sentencia=fecha_sentencia
                )
                victima_row.save()
                agresor_row.save()
        return

def getTableVictimaData():
    feminicidios_data()
    victimas_array=[]
    agresor_array=[]
    datos1={
        'victimas':victimas_array,
        'agresores':agresor_array
    }
    victimas=Victima.objects.all()
    print(len(victimas))
    agresores=Agresor.objects.all()
    for  i in range(1,(len(victimas))):
        if i == (len(victimas)-1):
            print("CHAPUANTA AMAME")
        # print("this is the geolocalizacion")
        # print(victimas[i].geolocalizacion)
        # if(victimas[i].geolocalizacion!="No se sabe" and victimas[i].geolocalizacion!="Geolocalización" ):
        if(victimas[i].geolocalizacion!="No se sabe"):
            point=victimas[i].geolocalizacion.split(',')

        elif (victimas[i].geolocalizacion=="No se sabe"):
            point=["No se sabe"," No se sabe"]

        # print("this is the point")
        # print(point)
        datos_victima={
            'ano_muerte': victimas[i].ano,
            'mes_muerte': victimas[i].mes,
            'fecha_muerte':victimas[i].fecha,
            'nombre_victima':victimas[i].nombre,
            'edad_victima':victimas[i].edad,
            'lugar_victima':victimas[i].lugar,
            'provincia':victimas[i].provincia,
            'departmento':victimas[i].departamento,
            'lat': point[0],
            'long':point[1].strip(),
            'circunstancias': victimas[i].circunstancias,
            'agesion_previa':victimas[i].agresion_previa,
            'estado_del_caso':victimas[i].estado_del_caso,
            # 'situacion_del_presunto_autor':victimas[i].situacion_del_presunto_autor,
            'numero_hijos': victimas[i].numero_hijos
        }
        victimas_array.append(datos_victima)

        datos_agresor={}
        # datos_agresor={
        #     'ano_crimen':agresores[i].ano,
        #     'mes_crimen':agresores[i].mes,
        #     'fecha_crimen':agresores[i].fecha,
        #     'nombre_victima':agresores[i].nombre_victima,
        #     'edad_acusado':agresores[i].edad_acusado,
        #     'temperancia': agresores[i].temperancia,
        #     'intento_suicidio':agresores[i].intento_suicidio,
        #     'relacion_victima':agresores[i].relacion_victima,
        #     'estado_del_caso':agresores[i].estado_del_caso,
        #     'situacion_del_presunto_autor':agresores[i].situacion_del_presunto_autor,
        #     'sentencia':agresores[i].sentencia,
        #     'fecha_sentencia':agresores[i].fecha_sentencia
        # }
        agresor_array.append(datos_agresor)
    # print(datos1['victimas'])
    print("now print CHAPOUS")
    print(victimas[len(victimas)-1].nombre)
    return datos1


datos = getTableVictimaData()


def default_map(request):

    file_path_bolivia="PrevencionTool/static/PrevencionTool/scripts/countries.geojson"
    file_path_departments="PrevencionTool/static/PrevencionTool/scripts/departamentosBol.json"
    file_path_municipalities="PrevencionTool/static/PrevencionTool/scripts/MunicipiosBol.json"
    data_dict={}
    with open(file_path_bolivia) as json_data:
        data_dict=json.load(json_data)

    with open(file_path_departments) as json_data:
        depts=json.load(json_data)

    with open(file_path_municipalities) as json_data:
        munipals=json.load(json_data)

    feminicidios_data2 = datos
    # feminicidios_data2=getTableVictimaData()

    # chart_object=getNationalTimeSeries(feminicidios_data2)
    # print(data2)

    context={
        "countries":data_dict,
        "departments":depts,
        "munipalities":munipals,
        "feminicidios_data":feminicidios_data2,
        # "chart_object": chart_object
    }
    return render(request, 'PrevencionTool/index.html', context)

def completeHoles(yearsMonths):
    onlyMonths=[]
    for x in yearsMonths:
        monthX = x.split('-')[1]
        onlyMonths.append(monthX)
    indexX=1
    completeMonths = []
    indexArrays = []
    final_object={}
    print("this is the ONLYMONTHS")
    print(onlyMonths)
    for m in onlyMonths:
        # if(indexX==1):

        if completeMonths != []:
            if (completeMonths[len(completeMonths)-1]!=int(m)):
                completeMonths.append(int(m))
        if completeMonths == []:
            completeMonths.append(int(m))
        if(len(onlyMonths)!=indexX):
            if(int(m)==12 and int(onlyMonths[indexX])!=1):
                completeMonths.append(1)
                indexArrays.append(indexX)
            if(int(m)!=12):
                if(int(m)+1 != int(onlyMonths[indexX])):
                    indexArrays.append(indexX+len(indexArrays))
                    if(int(m)+1 < 10):
                        completeMonths.append(int(m)+1)
        indexX =indexX +1
    final_object['dates']=completeMonths
    final_object['index']=indexArrays
    return final_object
def completeDeaths(deathsYearsMonths, indexToZero):
    # deathFillArray=[0] * len(deathsYearsMonths)
    deathFillArray = copy.deepcopy(deathsYearsMonths)
    print(deathFillArray)
    indexX=0;
    for d in deathFillArray:
        # if indexX not in indexToZero:
        #     deathFillArray[indexX] = deathsYearsMonths[indexX]
        if indexX in indexToZero:
            deathFillArray.insert(indexX, 0)
            # deathFillArray[indexX] = 0
        indexX = indexX+1
    # print("THIS IS THE DEATHFILL ARRAY!")
    # print(len(deathFillArray))
    return deathFillArray
def makeDatesPrediction(monthsX,length):
    arrayX = []
    initialValue = 0
    if monthsX[len(monthsX)-1] != 12:
        initialValue = monthsX[len(monthsX)-1] + 1
    if monthsX[len(monthsX)-1] == 12:
        initialValue = 1
    for x in range(0, length):
        newVal = initialValue + x
        if newVal <= 12:
            arrayX.append(newVal)
        if newVal > 12:
            arrayX.append(newVal-12)

    return arrayX
def simpleLinearRegression(dates,deaths):
    months_and_index= completeHoles(dates)
    deathsXX = completeDeaths(deaths,months_and_index['index'])
    print(len(months_and_index['dates']))
    print(dates)
    print(months_and_index['dates'])
    print(len(deathsXX))
    print(deaths)
    print(deathsXX)
    #CREATE DATAFRAME FOR THE REGRESSOR#
    df_regressor_data= {'dates': months_and_index['dates'], 'deaths': deathsXX}
    df_regressor = pd.DataFrame(data=df_regressor_data)
    df_regressor_data_pred= {'dates_pred': makeDatesPrediction(months_and_index['dates'],6)}
    df_regressor_pred = pd.DataFrame(data=df_regressor_data_pred)

    #DEFINE THE "X" and "y" for the linear model#
    X = df_regressor['dates'].values.reshape(-1,1)
    y = df_regressor['deaths'].values.reshape(-1,1)
    X_preds = df_regressor_pred['dates_pred'].values.reshape(-1,1)

    # Create linear regression object
    regressor = linear_model.LinearRegression()

    #DIVIDE THE DATASET IN TEH TRAINING AND VALIDATION TEST#
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
    ##TRAIN THE ALGORITHM
    regressor.fit(X_train, y_train) #training the algorithm
    # regr.fit(np.array(months_and_index['dates']).reshape(1, -1), np.array(deathsXX).reshape(1,-1))

    # The coefficients
    print('Coefficients: \n', regressor.coef_)
    # The intercept
    print('Intercepts: \n', regressor.intercept_)
    # Make predictions using the testing set
    y_pred = regressor.predict(X_test)
    # print('prediction: \n', y_pred)
    # print("compare the y actual and the y prediction")
    # print('prediction: \n', y_test)
    # print('Mean Absolute Error:', metrics.mean_absolute_error(y_test, y_pred))
    # print('Mean Squared Error:', metrics.mean_squared_error(y_test, y_pred))
    # print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(y_test, y_pred)))
    # print('Means Deaths:', mean(deathsXX))
    y_new_pred = regressor.predict(X_preds)
    y_new_pred_1D = y_new_pred.flatten()
    total_sum = np.sum(y_new_pred.flatten())
    print(total_sum)
    return total_sum

def localGraphs(request):
    # print("THIS IS THE LOCALGRAPHS")
    territory = request.GET['territory']
    # datos = getTableVictimaData(request)
    fechas=[]
    muertes=[]
    departamentos=[]
    print("this is the localDataGraphs")
    print(datos['victimas'])
    for x in datos['victimas']:
        if x['fecha_muerte'] !='No se sabe':
            count=1
            fechas.append(datetime.datetime.strptime(x['fecha_muerte'], '%d-%m-%Y'))
            departamentos.append(x['departmento'])
            muertes.append(count)
    if territory != 'Nacional':
        newFeminicidioObject={
            'fecha_muerte':fechas,
            'departamento': departamentos,
            'muertes':muertes,
        }
        columns=['fecha_muerte','departamento','muertes']
        # columns=['fecha_muerte','muertes']
        df=pd.DataFrame(newFeminicidioObject, columns=columns)
        df.sort_values(by=['fecha_muerte'], inplace = True, ascending=True)
        df['fecha_muerte']= df['fecha_muerte'].dt.strftime('%Y-%m-%d')
        depa_df = df.loc[df['departamento'] == territory]
        # print(type(depa_df))
        # print(depa_df)
        depa_df_group=depa_df.groupby(['fecha_muerte'])['muertes'].sum().reset_index()
        # print(type(depa_df_group))
        depa_df_group2 = depa_df_group[['fecha_muerte','muertes']].copy()

        print("this is the DEPA_DF_GROUP")
        print(depa_df_group2)
        if not depa_df_group2.empty:
            depa_df_group2[['Year','Month','Day']]= depa_df_group2['fecha_muerte'].str.split('-', expand=True)
            # print("afeter")
            # print(depa_df_group2)
            depa_df_group3=depa_df_group2.groupby(['Year','Month'])['muertes'].sum().reset_index()
            depa_df_group3['newFecha'] = depa_df_group3[['Year', 'Month']].agg('-'.join, axis=1)

            # print(depa_df_group3)

            depa_json = depa_df_group3.to_json(orient='columns')
            depa_json_ob = json.loads(depa_json)
            # print(depa_json_ob)
            dates = list(depa_json_ob['newFecha'].values())
            deaths = list(depa_json_ob['muertes'].values())
            # predicted_six_months = simpleLinearRegression(dates,deaths)

            # print("THIS ARE THE DATES")
            # print(dates)
            # months_and_index= completeHoles(dates)
            # print(months_and_index['dates'])
            # deathsXX = completeDeaths(deaths,months_and_index['index'])
            # print(deathsXX)
            depa_object={
                'fecha':dates,
                'muertes':deaths,
                # 'pred_six': predicted_six_months
            }
        else:
            depa_object={
                'fecha':[],
                'muertes':[],
                # 'pred_six': predicted_six_months
            }

    else:
        newFeminicidioObject={
            'fecha_muerte':fechas,
            'muertes':muertes,
        }
        columns=['fecha_muerte','muertes']
        df=pd.DataFrame(newFeminicidioObject, columns=columns)
        df.sort_values(by=['fecha_muerte'], inplace = True, ascending=True)
        df['fecha_muerte']= df['fecha_muerte'].dt.strftime('%Y-%m-%d')
        national_df=df.groupby(['fecha_muerte'])['muertes'].sum().reset_index()
        depa_df_group2 = national_df[['fecha_muerte','muertes']].copy()

        # print(depa_df_group2)
        depa_df_group2[['Year','Month','Day']]= depa_df_group2['fecha_muerte'].str.split('-', expand=True)
        # print("afeter")
        # print(depa_df_group2)
        depa_df_group3=depa_df_group2.groupby(['Year','Month'])['muertes'].sum().reset_index()
        depa_df_group3['newFecha'] = depa_df_group3[['Year', 'Month']].agg('-'.join, axis=1)

        # print(depa_df_group3)
        national_json = depa_df_group3.to_json(orient='columns')
        # print(national_json)
        national_json_ob = json.loads(national_json)
        dates = list(national_json_ob['newFecha'].values())
        deaths = list(national_json_ob['muertes'].values())
        # predicted_six_months = simpleLinearRegression(dates,deaths)
        # months_and_index= completeHoles(dates)
        # deathsXX = completeDeaths(deaths,months_and_index['index'])
        # # print(len(months_and_index['dates']))
        # # print(len(deathsXX))
        #
        # #CREATE DATAFRAME FOR THE REGRESSOR#
        # df_regressor_data= {'dates': months_and_index['dates'], 'deaths': deathsXX}
        # df_regressor = pd.DataFrame(data=df_regressor_data)
        # df_regressor_data_pred= {'dates_pred': makeDatesPrediction(months_and_index['dates'],6)}
        # df_regressor_pred = pd.DataFrame(data=df_regressor_data_pred)
        #
        # #DEFINE THE "X" and "y" for the linear model#
        # X = df_regressor['dates'].values.reshape(-1,1)
        # y = df_regressor['deaths'].values.reshape(-1,1)
        # X_preds = df_regressor_pred['dates_pred'].values.reshape(-1,1)
        #
        # # Create linear regression object
        # regressor = linear_model.LinearRegression()
        #
        # #DIVIDE THE DATASET IN TEH TRAINING AND VALIDATION TEST#
        # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        # ##TRAIN THE ALGORITHM
        # regressor.fit(X_train, y_train) #training the algorithm
        # # regr.fit(np.array(months_and_index['dates']).reshape(1, -1), np.array(deathsXX).reshape(1,-1))
        #
        # # The coefficients
        # print('Coefficients: \n', regressor.coef_)
        # # The intercept
        # print('Intercepts: \n', regressor.intercept_)
        # # Make predictions using the testing set
        # y_pred = regressor.predict(X_test)
        # print('prediction: \n', y_pred)
        # print("compare the y actual and the y prediction")
        # print('prediction: \n', y_test)
        # print('Mean Absolute Error:', metrics.mean_absolute_error(y_test, y_pred))
        # print('Mean Squared Error:', metrics.mean_squared_error(y_test, y_pred))
        # print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(y_test, y_pred)))
        # print('Means Deaths:', mean(deathsXX))
        # y_new_pred = regressor.predict(X_preds)
        # print("Predcitors")
        # print(y_new_pred)
        # print(type(y_new_pred))
        # print(y_new_pred.ndim)
        # print(y_new_pred.flatten())
        # print(np.sum(y_new_pred.flatten()))
        depa_object={
            'fecha':dates,
            'muertes':deaths,
            # 'pred_six': predicted_six_months

        }

    return JsonResponse(depa_object)
def getNumberOfMonths(df):
    print("localpie vefore")
    # depa_count_df = df.loc[df['departamento'] == "La Paz"]
    depa_count_df = df
    df_count_sum = depa_count_df.groupby(['fecha_muerte'])['muertes'].sum().reset_index()
    df_count_sum[['Year','Month','Day']]= df_count_sum['fecha_muerte'].str.split('-', expand=True)
    df_count_sum['Year-Month']= df_count_sum[['Year', 'Month']].agg('-'.join, axis=1)
    total_meses = df_count_sum['Year-Month'].unique()
    return total_meses.size

def getNumberOfYears(df):
    depa_count_df = df
    df_count_sum = depa_count_df.groupby(['fecha_muerte'])['muertes'].sum().reset_index()
    df_count_sum[['Year','Month','Day']]= df_count_sum['fecha_muerte'].str.split('-', expand=True)
    total_years = df_count_sum['Year'].unique()
    return total_years.size
def getSTDBigArea(df):
    depa_count_df = df
    df_count_sum = depa_count_df.groupby(['fecha_muerte'])['muertes'].sum().reset_index()
    print("this is the df_count sum")
    print(df_count_sum)
    standard_dev = []
    if not df_count_sum.empty:
        df_count_sum[['Year','Month','Day']]= df_count_sum['fecha_muerte'].str.split('-', expand=True)
        df_sum_year=df_count_sum.groupby(['Year'])['muertes'].sum().reset_index()
        sum_deaths_years = df_sum_year['muertes'].to_numpy()
        standard_dev = np.std(sum_deaths_years)

    # print("this is the standard dev")
    # print(standard_dev)
    return standard_dev

def getSTDSmallArea(df,areaType):
    list_unique_areas_std=[]
    df_count_sum = df
    area_std=[]
    if not df_count_sum.empty:
        df_count_sum[['Year','Month','Day']]= df_count_sum['fecha_muerte'].str.split('-', expand=True)
        df_grouped_depa = df_count_sum.groupby([areaType,'Year'])['muertes'].sum().reset_index()
        areas_list = sorted(df_count_sum[areaType].unique())

        for area in areas_list:
            area_df_one = df_grouped_depa.loc[df_grouped_depa[areaType] == area]
            sum_deaths_years = area_df_one['muertes'].to_numpy()
            area_std = np.std(sum_deaths_years)
            list_unique_areas_std.append(area_std)
    return list_unique_areas_std

def localPieGraphs(request):
    territory = request.GET['territory']
    print(territory)
    # datos = getTableVictimaData(request)
    fechas=[]
    muertes=[]
    departamentos=[]
    provincias = []
    national_object={}
    for x in datos['victimas']:
        if x['fecha_muerte'] !='No se sabe':
            count=1
            # fechas.append(datetime.datetime.strptime(x['fecha_muerte'], '%d-%m-%Y').strftime("%m/%d/%Y"))
            fechas.append(datetime.datetime.strptime(x['fecha_muerte'], '%d-%m-%Y'))
            departamentos.append(x['departmento'])
            muertes.append(count)
            provincias.append(x['provincia'])

    newFeminicidioObject={
        'fecha_muerte':fechas,
        'departamento': departamentos,
        'muertes':muertes,
        'provincia':provincias,
    }
    columns=['fecha_muerte','departamento','provincia','muertes']
    # columns=['fecha_muerte','muertes']
    df=pd.DataFrame(newFeminicidioObject, columns=columns)
    df.sort_values(by=['fecha_muerte'], inplace = True, ascending=True)
    df['fecha_muerte']= df['fecha_muerte'].dt.strftime('%Y-%m-%d')
    total_months=getNumberOfMonths(df)
    total_years = getNumberOfYears(df)

    if territory =='Nacional':
        standard_dev_nacional = getSTDBigArea(df)
        national_df=df.groupby(['departamento'])['muertes'].sum().reset_index()
        new_index = len(national_df)
        total_sum_regions = national_df['muertes'].sum()
        national_df.loc[new_index]=['Nacional',total_sum_regions]
        national_df['average_monthly']= national_df['muertes']/total_months
        national_df['average_years']= national_df['muertes']/total_years
        list_unique_areas_std = getSTDSmallArea(df,'departamento')
        list_unique_areas_std.append(standard_dev_nacional)
        np_unique_areas_std = np.asarray(list_unique_areas_std)
        # print(list_unique_areas_std)

        national_df['std_year']=np_unique_areas_std
        # national_df['totalMonths'] = total_months
        print(national_df)
        national_json = national_df.to_json(orient='columns')
        national_json_ob = json.loads(national_json)
        departamento_list = list(national_json_ob['departamento'].values())
        deaths = list(national_json_ob['muertes'].values())
        avg_month_list = list(national_json_ob['average_monthly'].values())
        avg_years_list = list(national_json_ob['average_years'].values())
        variation_year_list = list(national_json_ob['std_year'].values())
        national_object={
            'territory':departamento_list,
            'muertes':deaths,
            'avg_years':avg_years_list,
            'avg_months':avg_month_list,
            'variation':variation_year_list
        }
    else:
        print("we are not in national")
        depa_df = df.loc[df['departamento'] == territory]
        standard_dev_dep = getSTDBigArea(depa_df)
        list_unique_areas_std = getSTDSmallArea(depa_df,'provincia')
        print("first list")
        print(list_unique_areas_std)
        if list_unique_areas_std:
            list_unique_areas_std.append(standard_dev_dep)
            np_unique_areas_std = np.asarray(list_unique_areas_std)
            depa_df_group=depa_df.groupby(['provincia'])['muertes'].sum().reset_index()
            new_index = len(depa_df_group)
            total_sum_regions = depa_df_group['muertes'].sum()
            depa_df_group.loc[new_index]=['Nacional',total_sum_regions]
            depa_df_group['average_monthly']= depa_df_group['muertes']/total_months
            depa_df_group['average_years']= depa_df_group['muertes']/total_years
            print("this is the length of the stds in the deps")
            print(len(np_unique_areas_std))
            print(depa_df_group)
            depa_df_group['std_year']=np_unique_areas_std

            # depa_df_group['totalMonths'] = total_months

            # print(type(depa_df_group))
            #
            print(depa_df_group)

            depa_json = depa_df_group.to_json(orient='columns')
            depa_json_ob = json.loads(depa_json)
            # print(depa_json_ob)
            provincias_list = list(depa_json_ob['provincia'].values())
            deaths = list(depa_json_ob['muertes'].values())
            avg_month_list = list(depa_json_ob['average_monthly'].values())
            avg_years_list = list(depa_json_ob['average_years'].values())
            variation_year_list = list(depa_json_ob['std_year'].values())


            national_object={
                'territory':provincias_list,
                'muertes':deaths,
                'avg_years':avg_years_list,
                'avg_months':avg_month_list,
                'variation': variation_year_list
            }
        else:
            national_object={
                'territory':[],
                'muertes':[],
                'avg_years':[],
                'avg_months':[],
                'variation':[]
            }

    return JsonResponse(national_object)

def addFeminicidioCase(request):
    responseString="Feminicidio was added succesfully"
    nombreFeminicidio = request.POST['nombre']
    direccionFeminicidio = request.POST['dirreccion']
    departamentoFeminicidio = request.POST['departamento']
    provinciaFeminicidio = request.POST['provincia']
    geolocalizacionFeminicidio = request.POST['geolocalizacion']
    edadFeminicidio = request.POST['edad']
    hijosFeminicidio = request.POST['hijos']
    fechaFeminicidio = request.POST['fecha']
    anoFeminicidio = fechaFeminicidio.split("-")[2]
    mesFeminicidio = changeMonthToWord(fechaFeminicidio.split("-")[1])
    agresionPreviaFeminicidio = request.POST['agresion']
    causaMuerteFeminicidio = request.POST['causaMuerte']
    estadoDelCasoFeminicidio = request.POST['estadoDelCaso']
    circunstanciaFeminicidio = request.POST['circunstancia']
    print(request.POST)
    victima_row = Victima(
        ano=anoFeminicidio,
        mes=mesFeminicidio,
        fecha=fechaFeminicidio,
        nombre=nombreFeminicidio,
        edad=edadFeminicidio,
        lugar=direccionFeminicidio,
        provincia=provinciaFeminicidio,
        departamento=departamentoFeminicidio,
        geolocalizacion=geolocalizacionFeminicidio,
        circunstancias=circunstanciaFeminicidio,
        agresion_previa=agresionPreviaFeminicidio,
        estado_del_caso=estadoDelCasoFeminicidio,
        causa_muerte=causaMuerteFeminicidio,
        numero_hijos=hijosFeminicidio
    )
    victima_row.save()
    csv_path="PrevencionTool/static/PrevencionTool/scripts/Bol_Feminicidio 2013-16.csv"
    exclude = (12,13,14,15,16,18,19,20,22,23,24,25,26,27,28,29,30,31,32,33,34)
    columnsWrite = (0,1,2,3,4,5,6,7,8,9,10,11,17,21)
    fields = []
    fieldsObject={
        '0':anoFeminicidio,
        '1':mesFeminicidio,
        '2':fechaFeminicidio,
        '3':nombreFeminicidio,
        '4':edadFeminicidio,
        '5':direccionFeminicidio,
        '6':provinciaFeminicidio,
        '7':departamentoFeminicidio,
        '8':geolocalizacionFeminicidio,
        '9':circunstanciaFeminicidio,
        '10':agresionPreviaFeminicidio,
        '11':causaMuerteFeminicidio,
        '17':estadoDelCasoFeminicidio,
        '21':hijosFeminicidio
    }
    stringFinal = ""
    for x in range(0, 34):
        if str(x) in fieldsObject:
            fields.append(fieldsObject[str(x)])
        else:
            fields.append("")

    with open(csv_path, 'a') as f:
        writer = csv.writer(f)
        writer.writerow(fields)

    point=[]
    if(geolocalizacionFeminicidio != "No se sabe"):
        point=geolocalizacionFeminicidio.split(',')

    elif (geolocalizacionFeminicidio == "No se sabe"):
        point=["No se sabe"," No se sabe"]

    # print("this is the point")
    # print(point)
    datos_victima={
        'ano_muerte': anoFeminicidio,
        'mes_muerte': mesFeminicidio,
        'fecha_muerte':fechaFeminicidio,
        'nombre_victima':nombreFeminicidio,
        'edad_victima':edadFeminicidio,
        'lugar_victima':direccionFeminicidio,
        'provincia':provinciaFeminicidio,
        'departmento':departamentoFeminicidio,
        'lat': point[0],
        'long':point[1].strip(),
        'circunstancias': circunstanciaFeminicidio,
        'agesion_previa':agresionPreviaFeminicidio,
        'estado_del_caso':estadoDelCasoFeminicidio,
        'numero_hijos': hijosFeminicidio
    }
    datos['victimas'].append(datos_victima)

    datos_agresor={}

    datos['agresores'].append(datos_agresor)

    return HttpResponse(responseString)

def changeMonthToWord(numberMonth):

    objtMonth={
        "01":"Enero",
        "02":"Febrero",
        "03":"Marzo",
        "04":"Abril",
        "05":"Mayo",
        "06":"Junio",
        "07":"Julio",
        "08":"Agosto",
        "09":"Septiembre",
        "10":"Octbre",
        "11":"Noviembre",
        "12":"Diciembre",
    }
    wordMonth = objtMonth[numberMonth]
    return wordMonth
def searchFeminicidioCase(request):
    responseObject={}
    territory = request.GET['region']
    subRegionFem = request.GET['subregion']
    fechas=[]
    departamentos=[]
    provincias = []
    nombres = []
    circunstancias = []
    national_object={}
    for x in datos['victimas']:
        if x['fecha_muerte'] !='No se sabe':
            # fechas.append(datetime.datetime.strptime(x['fecha_muerte'], '%d-%m-%Y').strftime("%m/%d/%Y"))
            fechas.append(datetime.datetime.strptime(x['fecha_muerte'], '%d-%m-%Y'))
            departamentos.append(x['departmento'])
            provincias.append(x['provincia'])
            circunstancias.append(x['circunstancias'])
            nombres.append(x['nombre_victima'])

    newFeminicidioObject={
        'fecha_muerte':fechas,
        'departamento': departamentos,
        'circunstancias':circunstancias,
        'provincia':provincias,
        'nombre':nombres,
    }
    columns=['fecha_muerte','departamento','provincia','nombre','circunstancias']
    # columns=['fecha_muerte','muertes']
    df=pd.DataFrame(newFeminicidioObject, columns=columns)
    df.sort_values(by=['fecha_muerte'], inplace = True, ascending=True)
    df['fecha_muerte']= df['fecha_muerte'].dt.strftime('%Y-%m-%d')

    if territory =='Nacional':
        national_df=df
        national_json = national_df.to_json(orient='columns')
        national_json_ob = json.loads(national_json)
        departamento_list = list(national_json_ob['departamento'].values())
        fecha_list = list(national_json_ob['fecha_muerte'].values())
        nombres_list = list(national_json_ob['nombre'].values())
        provincia_list = list(national_json_ob['provincia'].values())
        circunstancias_list = list(national_json_ob['circunstancias'].values())
        responseObject={
            'territory':departamento_list,
            'fechas':fecha_list,
            'nombres_list':nombres_list,
            'provincias':provincia_list,
            'circunstancias':circunstancias_list
        }
    else:
        depa_df = df.loc[df['departamento'] == territory]

        depa_json = depa_df.to_json(orient='columns')
        depa_json_ob = json.loads(depa_json)
        # print(depa_json_ob)
        departamento_list = list(depa_json_ob['departamento'].values())
        fecha_list = list(depa_json_ob['fecha_muerte'].values())
        nombres_list = list(depa_json_ob['nombre'].values())
        provincia_list = list(depa_json_ob['provincia'].values())
        circunstancias_list = list(depa_json_ob['circunstacias'].values())
        responseObject={
            'territory':departamento_list,
            'fechas':fecha_list,
            'nombres_list':nombres_list,
            'provincias':provincia_list,
            'circunstancias':circunstancias_list
        }


    return JsonResponse(responseObject)
