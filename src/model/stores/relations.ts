class Relations
{
    private relations: object = {};

    public isRelation(modelName: string, methodName: string): boolean
    {
        if (!this.relations.hasOwnProperty(modelName) ||
            this.relations[modelName].indexOf(methodName) === -1)
        {
            return false;
        }

        return true;
    }

    public getRelations(modelName: string): Array<string>
    {
        if (!this.relations.hasOwnProperty(modelName)) {
            return [];
        }

        return this.relations[modelName];
    }

    public setRelation(modelName: string, methodName: string): void
    {
        if (!this.relations.hasOwnProperty(modelName)) {
            this.relations[modelName] = [];
        }

        this.relations[modelName].push(methodName);
    }
}

export default new Relations();
