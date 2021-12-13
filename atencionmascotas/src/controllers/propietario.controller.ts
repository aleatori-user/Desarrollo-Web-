import {authenticate} from '@loopback/authentication';
<<<<<<< HEAD
import {service} from '@loopback/core';
=======
>>>>>>> ef4b19c9f327157e59af16542af0046de27f6fda
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
<<<<<<< HEAD
import {Llaves} from '../config/llaves';
=======
>>>>>>> ef4b19c9f327157e59af16542af0046de27f6fda
import {Credenciales, Propietario} from '../models';
import {PropietarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');
@authenticate("admin")
export class PropietarioController {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository,
<<<<<<< HEAD
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }


  @post("/identificarPropietario", {
    responses: {
      '200': {
        description: "Identificar Usuarios"
      }
    }
  })
  async identificarPersona(
    @requestBody() credendiales: Credenciales
  ) {
    let prop = await this.servicioAutenticacion.IdentificarPropietario(credendiales.usuario, credendiales.clave);
    if (prop) {
      let token = this.servicioAutenticacion.GenerarTokenPropietario(prop);
=======
    @repository(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post('/identificarPropietario', {
    responses: {
      '200': {
        description: "Identificacion de usuarios"
      }
    }
  })
  async validarPropietario(
    @requestBody() credenciales: Credenciales
  ) {

    let prop = await this.servicioAutenticacion.IdentificarPropietario(credenciales.usuario, credenciales.clave);
    if (prop) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(prop);
>>>>>>> ef4b19c9f327157e59af16542af0046de27f6fda
      return {
        datos: {
          nombre: prop.Nombres,
          correo: prop.Correo,
          id: prop.id
        },
        tk: token
      }
    } else {
<<<<<<< HEAD
      throw new HttpErrors[401]("Datos Invalidos");
=======
      throw new HttpErrors[401]("Datos invalidos");
>>>>>>> ef4b19c9f327157e59af16542af0046de27f6fda
    }
  }

  @post('/propietarios')
  @response(200, {
    description: 'Propietario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Propietario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {
            title: 'NewPropietario',
            exclude: ['id'],
          }),
        },
      },
    })
    propietario: Omit<Propietario, 'id'>,
  ): Promise<Propietario> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    propietario.Clave = claveCifrada;
<<<<<<< HEAD
    let objPropietario = await this.propietarioRepository.create(propietario);


    let destino = propietario.Correo;
    let asunto = 'Registro en la App Atencion Mascotas';
    let contenido = `Hola ${propietario.Nombres}, su nombre de usuario es: ${propietario.Correo} y su contraseña es: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
=======
    let p = await this.propietarioRepository.create(propietario);

    //Notificar Usuario
    let destino = propietario.Correo;
    let asunto = 'Registro en la plataforma'
    let contenido = `Hola ${propietario.Nombres}, su nombre de usuario es: ${propietario.Correo}, y su contraseña es: ${clave}`;
    fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`).
      then((data: any) => {
        console.log(data);
      })
    return p;



  }
>>>>>>> ef4b19c9f327157e59af16542af0046de27f6fda

    let sms = propietario.Telefono;
    let mensaje = `hola ${propietario.Nombres}, su nombre de usuario es: ${propietario.Correo}, y su contraseña es: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-sms?mensaje=${mensaje}&telefono=${sms}`)
      .then((data: any) => {
        console.log(data);
      });
    return objPropietario;
  }
  @authenticate.skip()
  @get('/propietarios/count')
  @response(200, {
    description: 'Propietario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.count(where);
  }
  @authenticate.skip()
  @get('/propietarios')
  @response(200, {
    description: 'Array of Propietario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Propietario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Propietario) filter?: Filter<Propietario>,
  ): Promise<Propietario[]> {
    return this.propietarioRepository.find(filter);
  }

  @patch('/propietarios')
  @response(200, {
    description: 'Propietario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Propietario,
    @param.where(Propietario) where?: Where<Propietario>,
  ): Promise<Count> {
    return this.propietarioRepository.updateAll(propietario, where);
  }

  @get('/propietarios/{id}')
  @response(200, {
    description: 'Propietario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Propietario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Propietario, {exclude: 'where'}) filter?: FilterExcludingWhere<Propietario>
  ): Promise<Propietario> {
    return this.propietarioRepository.findById(id, filter);
  }

  @patch('/propietarios/{id}')
  @response(204, {
    description: 'Propietario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Propietario, {partial: true}),
        },
      },
    })
    propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.updateById(id, propietario);
  }

  @put('/propietarios/{id}')
  @response(204, {
    description: 'Propietario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() propietario: Propietario,
  ): Promise<void> {
    await this.propietarioRepository.replaceById(id, propietario);
  }

  @del('/propietarios/{id}')
  @response(204, {
    description: 'Propietario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.propietarioRepository.deleteById(id);
  }
}
