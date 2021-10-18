import {
  ImportDeclaration,
  SourceFile,
  SyntaxKind,
  TryStatement,
  VariableDeclarationKind,
  WriterFunction,
} from "ts-morph";

import { ensureArray, MaybeArray } from "@ts-morpher/helper";
import {
  IGenericTypeParam,
  IInterfaceIndexSignature,
  IInterfaceProperty,
} from "@ts-morpher/types";

/**
 * Create a base export variable statement
 * @param source
 * @param identifier variable identifier, foo in export const foo = 'bar'
 * @param initializer initializer, bar in export const foo = 'bar'
 * @param kind declaration kind
 * @param apply save source file
 */
export function createBaseVariableExport(
  source: SourceFile,
  identifier: string,
  initializer: string | WriterFunction,
  kind: VariableDeclarationKind,
  apply = true
) {
  source.addVariableStatement({
    isExported: true,
    declarations: [
      {
        name: identifier,
        initializer,
      },
    ],
    declarationKind: kind,
  });

  apply && source.saveSync();
}

/**
 * Create base type alias export
 * @param source 
 * @param identifier 
 * @param typeInitializer 
 * @param genericTypeParams 
 * @param apply 
 * @example
 * createBaseTypeExport(source, "Foo", "Record<T, unknown>", [
    {
      name: "T",
      default: "'default_string_literal'",
      constraint: "string",
    },
  ]);

// create following statement:

export type Foo<T extends string = "default_string_literal"> = Record<
  T,
  unknown
>;

 */
export function createBaseTypeExport(
  source: SourceFile,
  identifier: string,
  typeInitializer: string | WriterFunction,
  genericTypeParams?: (IGenericTypeParam | string)[],
  apply = true
) {
  source.addTypeAlias({
    isExported: true,
    name: identifier,
    type: typeInitializer,
    typeParameters: genericTypeParams,
  });

  apply && source.saveSync();
}

/**
 * Create base interface export
 * @param source
 * @param identifier
 * @param interfaceExtends extra interfaces to extend
 * @param indexSignatures specify index-signatures like [key:string]: any
 * @param properties interface properties
 * @param genericTypeParams generic type params to use in interface
 * @param apply save source file
 * @example
 * createBaseInterfaceExport(
    source,
    "Foo",
    ["Bar", "Baz"],
    [
      {
        keyName: "Foo",
        keyType: "string",
        returnType: "unknown",
        isReadonly: false,
      },
    ],
    [
      {
        name: "name",
        type: "string",
      },
      {
        name: "age",
        type: "number",
        hasQuestionToken: true,
      },
      {
        name: "other",
        type: "T",
      },
    ],
    [
      {
        name: "T",
        default: "'default_string_literal'",
        constraint: "string",
      },
    ]
  );

  // create following statement:
  export interface Foo<T extends string = 'default_string_literal'> extends Bar, Baz {
      [Foo: string]: unknown;
      name: string;
      age?: number;
      other: T;
  }


 */
export function createBaseInterfaceExport(
  source: SourceFile,
  identifier: string,
  interfaceExtends: string[] = [],
  indexSignatures: IInterfaceIndexSignature[] = [],
  properties: IInterfaceProperty[] = [],
  genericTypeParams: (IGenericTypeParam | string)[] = [],
  apply = true
) {
  source.addInterface({
    isExported: true,
    name: identifier,
    extends: interfaceExtends,
    typeParameters: genericTypeParams,
    indexSignatures,
    properties,
  });

  apply && source.saveSync();
}
