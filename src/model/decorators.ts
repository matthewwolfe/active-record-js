import store from './store';


export function model(constructor: Function) {
    store.setModel(constructor);
}
