﻿module Typejector.Annotation {
    import Class = Type.Class;

    export function singleton(clazz: Class) {
        injection(clazz, new Component.Metadata.SingletonMetadata());
    }

} 