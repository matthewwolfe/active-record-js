class Store
{
    private models: object = {};

    public setModel(Model): void
    {
        this.models[Model.name] = Model;
    }

    public getModel(name: string)
    {
        return this.models[name];
    }
}

export default new Store();
