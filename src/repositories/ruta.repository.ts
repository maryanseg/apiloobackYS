import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Aeropuerto, Ruta, RutaRelations} from '../models';
import {AeropuertoRepository} from './aeropuerto.repository';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id,
  RutaRelations
> {

  public readonly aeropuerto: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;


  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('AeropuertoRepository') protected aeropuertoRepositoryGetter: Getter<AeropuertoRepository>,
  ) {
    super(Ruta, dataSource);
    this.aeropuerto = this.createBelongsToAccessorFor('aeropuerto', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('aeropuerto', this.aeropuerto.inclusionResolver);

  }
}
