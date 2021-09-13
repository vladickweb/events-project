# Tabla de rutas
## _Vladyslav && Juan de santis_



## Ruta ('/') index




| Ruta | Función | Método |
| ------ | ------ | ----- |
| / | Ruta raíz, pagina home| GET


## Ruta ('/') login/signup
| Ruta | Función | Método |
| ------ | ------ | ----- |
| /login | Inicio de sesión | GET |
| /login | Inicio de sesión | POST |
| /sign-up | Crear cuenta  | GET |
| /sign-up | Crear cuenta | POST |
| /logout | Cerrar Sesion | GET |

## Ruta ('/auth') login/signup con Google
| Ruta | Función | Método |
| ------ | ------ | ----- |
| /auth/google | Inicio de sesión | GET |
| /auth/google/redirect | redirección tras inicio | GET |

## Ruta ('/admin') rutas para Rol Admin
| Ruta | Función | Método |
| ------ | ------ | ----- |
| /admin | Listado de eventos para aceptar o rechazar | GET |
| /admin/users | Listado de Usuarios | GET |
| /admin/users/:id | Detalles de usuarios  | GET |
| /admin/users/:id/editar | Form para editar usuarios | GET |
| /admin/users/:id/editar | Envio de form | POST |
| /admin/users/:id/eliminar | Borrado de usuario | POST |

## Ruta ('/company') rutas para Rol Empresa
| Ruta | Función | Método |
| ------ | ------ | ----- |
| /company/profile | Perfil de la empresa con tus eventos | GET |
| /company/:id | Detalles del evento | GET |
| /company/:id | Modificar datos  | POST |
| /company/crear | Form para crear evento | GET |
| /company/crear | Envio de form | POST |
| /company/estadísticas | Estadísticas de todos sus eventos | GET |

## Ruta ('/user') rutas para Rol Usuario
| Ruta | Función | Método |
| ------ | ------ | ----- |
| /user | Datos de usuario y listado de amigos | GET |
| /user/editar-perfil | Form para editar perfil | GET |
| /user/editar/perfil | Envio de Form  | POST |
| /user/buscar-usuario | Busqueda de usuarios | GET |
| /user/buscar-usuario/:id | Agregar usuario a amigo | GET |
| /user/amigos | Chat con Amigos | GET |

