import {
  ClassDeclaration,
  ImportDeclaration,
  MethodDeclaration,
  PropertyDeclaration,
  SyntaxKind,
  VariableStatement,
} from "ts-morph";

export type MaybyArray<T> = T | T[];

export function ensureArray<T>(maybeArray: MaybyArray<T>): T[] {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

export function getDeclarationIdentifier(
  classDec:
    | ClassDeclaration
    | MethodDeclaration
    | PropertyDeclaration
    | ImportDeclaration
) {
  return classDec.getFirstChildByKind(SyntaxKind.Identifier).getText();
}

export function getVariableIdentifier(statement: VariableStatement): string {
  return statement
    .getFirstChildByKind(SyntaxKind.VariableDeclarationList)
    .getFirstChildByKind(SyntaxKind.SyntaxList)
    .getFirstChildByKind(SyntaxKind.VariableDeclaration)
    .getFirstChildByKind(SyntaxKind.Identifier)
    .getText();
}
