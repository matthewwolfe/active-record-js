import models from './stores/models';
import relations from './stores/relations';


export function model(constructor: Function) {
    models.setModel(constructor);
}

export function relation(target: any, methodName: string) {
    relations.setRelation(target.constructor.name, methodName);
}
