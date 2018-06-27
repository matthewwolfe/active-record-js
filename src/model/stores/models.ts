class Models
{
    private models: object = {};

    public setModel(Model): void
    {
        this.models[Model.name] = Model;
    }

    public getModel(name: string): any
    {
        return this.models[name];
    }
}

export default new Models();
