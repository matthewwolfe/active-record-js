import models from './stores/models';
import relations from './stores/relations';


export function model(constructor: Function): void {
    models.setModel(constructor);
}

export function relation(target: any, methodName: string): void {
    relations.setRelation(target.constructor.name, methodName);
}
