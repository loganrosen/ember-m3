import { dasherize } from '@ember/string';

export function computeAttributeReference(key, value, modelName, schemaInterface, schema) {
  schemaInterface._beginDependentKeyResolution(key);
  let reference = schema.computeAttributeReference(key, value, modelName, schemaInterface);
  schemaInterface._endDependentKeyResolution(key);
  return reference;
}

export function computeNestedModel(key, value, modelName, schemaInterface, schema) {
  schemaInterface._beginDependentKeyResolution(key);
  let nestedModel = schema.computeNestedModel(key, value, modelName, schemaInterface);
  schemaInterface._endDependentKeyResolution(key);
  return nestedModel;
}

export function resolveReferencesWithInternalModels(store, references) {
  return references.map(reference => {
    if (reference.type) {
      return store.peekRecord(dasherize(reference.type), reference.id);
    } else {
      let im = store._globalM3Cache[reference.id];
      if (im) {
        return im.getRecord();
      }
    }
  });
}

export function isResolvedValue(value) {
  return value && value.constructor && (value.constructor.isModel || value.constructor.isM3Model);
}
