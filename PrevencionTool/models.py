from django.db import models

# Create your models here.
class Victima(models.Model):
    ano = models.CharField(max_length = 50)
    mes = models.CharField(max_length = 50)
    fecha = models.CharField(max_length=50)
    nombre = models.CharField(max_length=50)
    edad=models.CharField(max_length=50)
    lugar=models.CharField(max_length=50)
    provincia=models.CharField(max_length=50)
    departamento=models.CharField(max_length=50)
    geolocalizacion=models.CharField(max_length=50)
    circunstancias=models.TextField()
    agresion_previa=models.TextField()
    causa_muerte=models.TextField()
    estado_del_caso=models.CharField(max_length=50, default="nada")
    situacion_del_presunto_autor=models.CharField(max_length=100, default="nada")
    numero_hijos=models.CharField(max_length=50)

    # situacion_del_presunto_autor=models.TextField()
    # sentencia = models.TextField()
    # lat=models.CharField(max_length=50)
    # lng=models.CharField(max_length=50)
    # estado_del_caso=models.CharField(max_length=50, default="nada")
    # situacion_del_presunto_autor=models.CharField(max_length=100, default="nada")
    # observaciones = models.TextField()
    # enlaces_originales = models.TextField()
    # enlaces_validos = models.TextField()
    # detalles_relacion_victima = models.TextField()
    # relacion_victima = models.TextField()
    # detalles_agresion_previa = models.TextField()
    # detalles_agresion_mortal =models.TextField()
    # estado_alcoholico = models.CharField(max_length=50)
    # intento_suicido = models.CharField(max_length=50)

    class Meta:
        db_table="victima"

class Agresor(models.Model):
    ano = models.CharField(max_length = 50)
    mes = models.CharField(max_length = 50)
    fecha = models.CharField(max_length = 50)
    nombre_victima=models.CharField(max_length=50)
    nombre_acusado=models.CharField(max_length=50)
    edad_acusado=models.CharField(max_length=50)
    temperancia=models.CharField(max_length=50)
    intento_suicidio=models.CharField(max_length=50)
    relacion_victima=models.CharField(max_length=50)
    estado_del_caso=models.CharField(max_length=50 , default="nada")
    situacion_del_presunto_autor=models.CharField(max_length=100, default="nada")
    sentencia=models.CharField(max_length=50)
    fecha_sentencia=models.CharField(max_length=50)
    class Meta:
        db_table="agresor"
