using {ion.alm.wl as wl} from '../db/schema';

@path: 's'
service Service {

    entity Equipments as projection on wl.Equipments;

}
