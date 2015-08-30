﻿namespace Typejector.Component.Factory.Support {
    import Class = Type.Class;

    import BeanDefinition = Config.BeanDefinition;
    import Scope = Config.Scope;
    import SingletonMetadata = Metadata.SingletonMetadata;

    export class SingletonScope extends PrototypeScope {
        private objectCache = [];

        get<T>(name: string, objectFactory: ObjectFactory<T>): T {
            let result: T;

            if (name in this.objectCache && (result = this.objectCache[name]) != undefined) {
                return result;
            }

            result = super.get<T>(name, objectFactory);

            this.objectCache[name] = result;

            return result;
        }

        remove(name: string): void {
            delete this.objectCache[name];
        }
    }


    export namespace SingletonScope {
        export const NAME = "singleton";
    }
}