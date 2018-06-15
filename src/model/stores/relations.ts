class Relations
{
    private relations: object = {};

    public isRelation(modelName, methodName)
    {
        if (!this.relations.hasOwnProperty(modelName) ||
            this.relations[modelName].indexOf(methodName) === -1)
        {
            return false;
        }

        return true;
    }

    public getRelations(modelName)
    {
        if (!this.relations.hasOwnProperty(modelName)) {
            return [];
        }

        return this.relations[modelName];
    }

    public setRelation(modelName, methodName)
    {
        if (!this.relations.hasOwnProperty[modelName]) {
            this.relations[modelName] = [];
        }

        this.relations[modelName].push(methodName);
    }
}

export default new Relations();
