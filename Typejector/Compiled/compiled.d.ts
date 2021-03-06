declare module Typejector.Type {
    type Class = {
        new (): any;
    };
}
declare module Typejector.Event.Interface {
    interface ICallback<ArgType> {
        (arg: ArgType, context?: any): any;
    }
    interface ICallbackDesc<ArgType> {
        Callback: ICallback<ArgType>;
        Subscriber: any;
    }
    /** Базовый интерфейс подписки на событие. Минимальная функциональность. Можем просто отписаться и все. */
    interface ISubscription {
        Unsubscribe: {
            (): void;
        };
    }
    /** Типизированная версия. Включает ссылки на событие и callback */
    interface ITypedSubscription<ArgType> extends ISubscription {
        Callback: ICallback<ArgType>;
        Event: Event<ArgType>;
    }
}
declare module Typejector.Event {
    class Event<ArgType> {
        private Callbacks;
        /** Подписаться на событие
        * @param {ICallback<ArgType>} callback Callback, который будет вызван при вызове функции
        * @param {any} subscriber Контекст, в котором должен быть вызван callback
        * @returns {ITypedSubscription<ArgType>} Объект типизированной подписки
        */
        Subscribe(callback: Interface.ICallback<ArgType>, subscriber: any): Interface.ITypedSubscription<ArgType>;
        /**
        *   Unsubscribe some callback from current event
        *   @param {Interface.ICallback<ArgType>} subscribet callback
        **/
        Unsubscribe(callback: Interface.ICallback<ArgType>): void;
        Trigger: Interface.ICallback<ArgType>;
    }
}
declare module Typejector.Exception {
    class IllegalArgumentException implements Error {
        name: string;
        message: string;
        prototype: Error;
        constructor(message?: string);
    }
    function assert(object: any, message?: string): void;
}
declare function assert(object: any, message?: string): void;
declare module Typejector.Component.Metadata {
    interface Metadata {
        name: string;
        value: any;
    }
}
declare module Typejector.Component.Metadata {
    class SingletonMetadata implements Metadata {
        name: string;
        value: boolean;
    }
    module SingletonMetadata {
        const NAME: string;
        function test(items: Array<Metadata>): boolean;
    }
}
declare module Typejector.Component.Metadata {
    class InterfaceMetadata implements Metadata {
        name: string;
        value: boolean;
    }
    module InterfaceMetadata {
        const NAME: string;
        function test(items: Array<Metadata>): boolean;
    }
}
declare module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    class TypeDescriptor {
        clazz: Class;
        genericTypes: Array<Class>;
        isArray(): boolean;
    }
}
declare module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    class DependencyDescriptor extends TypeDescriptor {
        parent: Class;
    }
}
declare module Typejector.Component.Factory.Config {
    interface PropertyDescriptor {
        name: string;
        clazz: TypeDescriptor;
    }
}
declare module Typejector.Component.Factory.Config {
    interface MethodDescriptor {
        name: string;
        arguments: Array<TypeDescriptor>;
    }
}
declare module Typejector.Component.Factory.Config {
    import Class = Type.Class;
    interface ResolveDefinition {
        clazz: Class;
        constructorArguments: Array<TypeDescriptor>;
        properties: Array<PropertyDescriptor>;
        methods: Array<MethodDescriptor>;
    }
}
declare module Typejector.Component.Factory.Config {
    interface BeanDefinition extends ResolveDefinition {
        metadata: Array<Metadata.Metadata>;
        name: string;
        scopeNames: string[];
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    class Bean implements Config.BeanDefinition {
        clazz: Class;
        metadata: Array<Metadata.Metadata>;
        name: string;
        scopeNames: string[];
        constructorArguments: Array<Config.TypeDescriptor>;
        properties: Array<Config.PropertyDescriptor>;
        methods: Array<Config.MethodDescriptor>;
        hasMetadata(metadata: {
            new (): Metadata.Metadata;
        }): boolean;
    }
}
declare module Typejector.Component {
    import Class = Type.Class;
    import BeanDefinition = Factory.Config.BeanDefinition;
    class BeanUtils {
        static isAssignable(clazz: Class, classFrom: Class): boolean;
        static isAbstract(beanDefinition: BeanDefinition): boolean;
        static isSingleton(beanDefinition: BeanDefinition): boolean;
        static newInstance(clazz: Class, ...args: any[]): any;
    }
}
declare module Typejector.Component.Factory {
    interface ObjectFactory<T> {
        getObject(): T;
    }
}
declare module Typejector.Component.Factory.Config {
    interface Scope {
        get<T>(name: string, objectFactory: ObjectFactory<T>): T;
        remove(name: string): void;
    }
}
declare module Typejector.Component.Factory.Support {
    import Scope = Config.Scope;
    class PrototypeScope implements Scope {
        get<T>(name: string, objectFactory: ObjectFactory<T>): T;
        remove(name: string): void;
    }
    module PrototypeScope {
        const NAME: string;
    }
}
declare module Typejector.Component.Factory.Support {
    class SingletonScope extends PrototypeScope {
        private objectCache;
        get<T>(name: string, objectFactory: ObjectFactory<T>): T;
        remove(name: string): void;
    }
    module SingletonScope {
        const NAME: string;
    }
}
declare module Typejector.Component.Factory {
    import Class = Type.Class;
    interface BeanFactory {
        containsBean(beanName: string): boolean;
        containsBean(clazz: Class): boolean;
        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
    }
}
declare module Typejector.Component.Factory.Registry {
    import BeanDefinition = Config.BeanDefinition;
    interface BeanDefinitionRegistry {
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanName: string): BeanDefinition;
        addBeanDefinitionPostProcessor(beanDefinitionPostProcessor: BeanDefinitionPostProcessor): void;
    }
}
declare module Typejector.Component.Factory {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    interface AutowireCapableBeanFactory extends BeanFactory {
        createBean<T>(clazz: Class): T;
        initializeBean<T>(instance: T, beanDefinititon: BeanDefinition): T;
        applyBeanPostProcessorsBeforeInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        applyBeanPostProcessorsAfterInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        resolveDependency(typeDescriptor: TypeDescriptor): any;
    }
}
declare module Typejector.Component.Factory {
    import Class = Type.Class;
    interface ListableBeanFactory extends BeanFactory {
        getBeansOfType<T>(clazz: Class): Array<T>;
        getBeanNamesOfType(clazz: Class): Array<string>;
    }
}
declare module Typejector.Component.Factory {
    import BeanDefinition = Config.BeanDefinition;
    interface BeanPostProcessor {
        postProcessAfterInitialization(bean: any, beanDefinititon: BeanDefinition): any;
        postProcessBeforeInitialization(bean: any, beanDefinititon: BeanDefinition): any;
    }
}
declare module Typejector.Component.Factory {
    import BeanDefinition = Config.BeanDefinition;
    interface BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
    }
}
declare module Typejector.Component.Factory {
    import Scope = Config.Scope;
    interface ConfigurableBeanFactory extends BeanFactory {
        addBeanPostProcessor(beanPostProcessor: BeanPostProcessor): void;
        registerScope(scopeName: string, scope: Scope): void;
        getRegisteredScope(scopeName: string): Scope;
    }
}
declare module Typejector.Component.Factory {
    interface ConfigurableListableBeanFactory extends ListableBeanFactory, AutowireCapableBeanFactory, ConfigurableBeanFactory {
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    class BeanNameGenerator {
        static generateBeanName(clazz: Class): string;
    }
}
declare module Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    class DefaultBeanDefinitionPostProcessor implements BeanDefinitionPostProcessor {
        postProcessBeanDefinition(beanDefinition: BeanDefinition): void;
    }
}
declare module Typejector.Component.Factory.Support {
    import BeanDefinition = Config.BeanDefinition;
    class DefaultBeanDefinitionRegistry implements Registry.BeanDefinitionRegistry {
        private registeredBeanDefinitions;
        private beanDefinitionPostProcessors;
        containsBeanDefinition(beanName: string): boolean;
        registerBeanDefinition(beanName: string, beanDefinition: BeanDefinition): void;
        getBeanDefinition(beanName: string): BeanDefinition;
        addBeanDefinitionPostProcessor(beanDefinitionPostProcessor: BeanDefinitionPostProcessor): void;
        protected getRegisteredBeanDefinitions(): BeanDefinition[];
        private applyBeanDefinitionPostProcessor(beanDefinition);
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    class FactoryBeanRegistrySupport extends DefaultBeanDefinitionRegistry {
        getFactory<T>(beanName: string): ObjectFactory<T>;
        getFactory<T>(clazz: Class): ObjectFactory<T>;
        protected doGetFactory<T>(beanDefinition: BeanDefinition): ObjectFactory<T>;
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import Scope = Config.Scope;
    class AbstractBeanFactory extends FactoryBeanRegistrySupport implements ConfigurableBeanFactory {
        private prototypeScope;
        private singletonScope;
        private registeredScopes;
        private beanPostProcessors;
        addBeanPostProcessor(beanPostProcessor: BeanPostProcessor): void;
        getBeanPostProcessors(): Array<BeanPostProcessor>;
        containsBean(beanName: string): boolean;
        containsBean(clazz: Class): boolean;
        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
        protected doGetBean(beanDifinition: BeanDefinition): any;
        registerScope(scopeName: string, scope: Scope): void;
        getRegisteredScope(scopeName: string): Scope;
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    class AbstractAutowireCapableBeanFactory extends AbstractBeanFactory implements AutowireCapableBeanFactory {
        createBean<T>(clazz: Class): T;
        protected doCreateBean(beanDefinition: BeanDefinition): any;
        protected doCreateObject(beanDefinition: BeanDefinition): any;
        initializeBean<T>(instance: T, beanDefinititon: BeanDefinition): T;
        applyBeanPostProcessorsBeforeInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        applyBeanPostProcessorsAfterInitialization<T>(existingBean: T, beanDefinititon: BeanDefinition): T;
        protected doGetFactory<T>(beanDefinition: BeanDefinition): ObjectFactory<T>;
        resolveDependency(typeDescriptor: TypeDescriptor): any;
        protected doResolveDependency(typeDescriptor: TypeDescriptor): any;
    }
}
declare module Typejector.Component.Factory.Support {
    import Class = Type.Class;
    import BeanDefinition = Config.BeanDefinition;
    import TypeDescriptor = Config.TypeDescriptor;
    class DefaultListableBeanFactory extends AbstractAutowireCapableBeanFactory implements ListableBeanFactory {
        getBeansOfType<T>(clazz: Class): Array<T>;
        getBeanNamesOfType(clazz: Class): Array<string>;
        protected doGetBeanNamesOfType(clazz: Class): string[];
        protected doGetBeansOfType(clazz: Class): any[];
        protected doGetBeanDefinitionsOfType(clazz: Class, useAbstract?: boolean): BeanDefinition[];
        protected doGetBean(beanDefinition: BeanDefinition): any;
        protected doResolveDependency(typeDescriptor: TypeDescriptor): any;
    }
}
declare module Typejector.Component.Context {
    import BeanFactory = Factory.BeanFactory;
    import TypeDescription = Factory.Config.TypeDescriptor;
    interface Context extends BeanFactory {
        register(typeDescriptor: TypeDescription): any;
    }
}
declare module Typejector.Component.Context.Config {
    import TypeDescriptor = Factory.Config.TypeDescriptor;
    import Metadata = Component.Metadata.Metadata;
    class BeanDescriptor extends TypeDescriptor {
        metadata: Metadata[];
    }
}
declare module Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    class ConstructorDependencyDescriptor extends DependencyDescriptor {
        position: number;
    }
}
declare module Typejector.Component.Context.Config {
    class MethodDependencyDescriptor extends ConstructorDependencyDescriptor {
        name: string;
    }
}
declare module Typejector.Component.Context.Config {
    import DependencyDescriptor = Factory.Config.DependencyDescriptor;
    class FieldDependencyDescriptor extends DependencyDescriptor {
        name: string;
    }
}
declare module Typejector.Component.Context {
    import Class = Type.Class;
    import TypeDescription = Factory.Config.TypeDescriptor;
    import BeanDefinition = Component.Factory.Config.BeanDefinition;
    class ApplicationContext implements Context {
        private mainBeanFactory;
        constructor();
        register(typeDescriptor: TypeDescription): void;
        protected doGetOrCreateBeanDefinition(clazz: Class): BeanDefinition;
        containsBean(beanName: string): boolean;
        containsBean(clazz: Class): boolean;
        getBean<T>(beanName: string): T;
        getBean<T>(clazz: Class): T;
    }
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function inject(requestType: Class, ...genericTypes: Class[]): any;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    import Metadata = Typejector.Component.Metadata.Metadata;
    function injection(metadata: Metadata[]): any;
    function injection(clazz: Class, ...metadata: Metadata[]): void;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function interface(clazz: Class): void;
}
declare module Typejector.Annotation {
    import Class = Type.Class;
    function singleton(clazz: Class): void;
}
declare module Typejector {
    import Context = Component.Context.Context;
    function getContext(): Context;
}
import injection = Typejector.Annotation.injection;
import inject = Typejector.Annotation.inject;
import interface = Typejector.Annotation.interface;
import singleton = Typejector.Annotation.singleton;
declare class Qwe {
    qwe: any;
}
declare class Qwer extends Qwe {
    qwer: any;
}
declare class Qwert extends Qwe {
    qwert: any;
}
declare class Abc {
    qwe: Qwe[];
    test(qwe: any): void;
}
declare var context: Typejector.Component.Context.Context;
declare var bean: Abc;
declare module Typejector.Component.Factory {
    import Class = Type.Class;
    class ObjectFactoryBuilder<T> {
        private args;
        private clazz;
        withArgs(args: any[]): ObjectFactoryBuilder<T>;
        forClass(clazz: Class): ObjectFactoryBuilder<T>;
        build(): ObjectFactory<T>;
    }
}
declare module Typejector.Sample {
}
declare module Typejector.Sample {
}
