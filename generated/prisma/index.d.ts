
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model notifications
 * 
 */
export type notifications = $Result.DefaultSelection<Prisma.$notificationsPayload>
/**
 * Model outages
 * 
 */
export type outages = $Result.DefaultSelection<Prisma.$outagesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Notifications
 * const notifications = await prisma.notifications.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Notifications
   * const notifications = await prisma.notifications.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.notifications`: Exposes CRUD operations for the **notifications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notifications.findMany()
    * ```
    */
  get notifications(): Prisma.notificationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outages`: Exposes CRUD operations for the **outages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Outages
    * const outages = await prisma.outages.findMany()
    * ```
    */
  get outages(): Prisma.outagesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    notifications: 'notifications',
    outages: 'outages'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "notifications" | "outages"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      notifications: {
        payload: Prisma.$notificationsPayload<ExtArgs>
        fields: Prisma.notificationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.notificationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.notificationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findFirst: {
            args: Prisma.notificationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.notificationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findMany: {
            args: Prisma.notificationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          create: {
            args: Prisma.notificationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          createMany: {
            args: Prisma.notificationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.notificationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          delete: {
            args: Prisma.notificationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          update: {
            args: Prisma.notificationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          deleteMany: {
            args: Prisma.notificationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.notificationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.notificationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          upsert: {
            args: Prisma.notificationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          aggregate: {
            args: Prisma.NotificationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotifications>
          }
          groupBy: {
            args: Prisma.notificationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.notificationsCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationsCountAggregateOutputType> | number
          }
        }
      }
      outages: {
        payload: Prisma.$outagesPayload<ExtArgs>
        fields: Prisma.outagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.outagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.outagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>
          }
          findFirst: {
            args: Prisma.outagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.outagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>
          }
          findMany: {
            args: Prisma.outagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>[]
          }
          create: {
            args: Prisma.outagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>
          }
          createMany: {
            args: Prisma.outagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.outagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>[]
          }
          delete: {
            args: Prisma.outagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>
          }
          update: {
            args: Prisma.outagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>
          }
          deleteMany: {
            args: Prisma.outagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.outagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.outagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>[]
          }
          upsert: {
            args: Prisma.outagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$outagesPayload>
          }
          aggregate: {
            args: Prisma.OutagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutages>
          }
          groupBy: {
            args: Prisma.outagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.outagesCountArgs<ExtArgs>
            result: $Utils.Optional<OutagesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    notifications?: notificationsOmit
    outages?: outagesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model notifications
   */

  export type AggregateNotifications = {
    _count: NotificationsCountAggregateOutputType | null
    _avg: NotificationsAvgAggregateOutputType | null
    _sum: NotificationsSumAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  export type NotificationsAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type NotificationsSumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type NotificationsMinAggregateOutputType = {
    location: string | null
    lat: number | null
    lng: number | null
    email: string | null
    datesubscribed: string | null
    id: string | null
    outageinfo: string | null
  }

  export type NotificationsMaxAggregateOutputType = {
    location: string | null
    lat: number | null
    lng: number | null
    email: string | null
    datesubscribed: string | null
    id: string | null
    outageinfo: string | null
  }

  export type NotificationsCountAggregateOutputType = {
    location: number
    lat: number
    lng: number
    email: number
    datesubscribed: number
    id: number
    outageinfo: number
    _all: number
  }


  export type NotificationsAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type NotificationsSumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type NotificationsMinAggregateInputType = {
    location?: true
    lat?: true
    lng?: true
    email?: true
    datesubscribed?: true
    id?: true
    outageinfo?: true
  }

  export type NotificationsMaxAggregateInputType = {
    location?: true
    lat?: true
    lng?: true
    email?: true
    datesubscribed?: true
    id?: true
    outageinfo?: true
  }

  export type NotificationsCountAggregateInputType = {
    location?: true
    lat?: true
    lng?: true
    email?: true
    datesubscribed?: true
    id?: true
    outageinfo?: true
    _all?: true
  }

  export type NotificationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to aggregate.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned notifications
    **/
    _count?: true | NotificationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationsMaxAggregateInputType
  }

  export type GetNotificationsAggregateType<T extends NotificationsAggregateArgs> = {
        [P in keyof T & keyof AggregateNotifications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotifications[P]>
      : GetScalarType<T[P], AggregateNotifications[P]>
  }




  export type notificationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithAggregationInput | notificationsOrderByWithAggregationInput[]
    by: NotificationsScalarFieldEnum[] | NotificationsScalarFieldEnum
    having?: notificationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationsCountAggregateInputType | true
    _avg?: NotificationsAvgAggregateInputType
    _sum?: NotificationsSumAggregateInputType
    _min?: NotificationsMinAggregateInputType
    _max?: NotificationsMaxAggregateInputType
  }

  export type NotificationsGroupByOutputType = {
    location: string
    lat: number | null
    lng: number | null
    email: string
    datesubscribed: string
    id: string
    outageinfo: string | null
    _count: NotificationsCountAggregateOutputType | null
    _avg: NotificationsAvgAggregateOutputType | null
    _sum: NotificationsSumAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  type GetNotificationsGroupByPayload<T extends notificationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
        }
      >
    >


  export type notificationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    location?: boolean
    lat?: boolean
    lng?: boolean
    email?: boolean
    datesubscribed?: boolean
    id?: boolean
    outageinfo?: boolean
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    location?: boolean
    lat?: boolean
    lng?: boolean
    email?: boolean
    datesubscribed?: boolean
    id?: boolean
    outageinfo?: boolean
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    location?: boolean
    lat?: boolean
    lng?: boolean
    email?: boolean
    datesubscribed?: boolean
    id?: boolean
    outageinfo?: boolean
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectScalar = {
    location?: boolean
    lat?: boolean
    lng?: boolean
    email?: boolean
    datesubscribed?: boolean
    id?: boolean
    outageinfo?: boolean
  }

  export type notificationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"location" | "lat" | "lng" | "email" | "datesubscribed" | "id" | "outageinfo", ExtArgs["result"]["notifications"]>

  export type $notificationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "notifications"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      location: string
      lat: number | null
      lng: number | null
      email: string
      datesubscribed: string
      id: string
      outageinfo: string | null
    }, ExtArgs["result"]["notifications"]>
    composites: {}
  }

  type notificationsGetPayload<S extends boolean | null | undefined | notificationsDefaultArgs> = $Result.GetResult<Prisma.$notificationsPayload, S>

  type notificationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<notificationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationsCountAggregateInputType | true
    }

  export interface notificationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['notifications'], meta: { name: 'notifications' } }
    /**
     * Find zero or one Notifications that matches the filter.
     * @param {notificationsFindUniqueArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends notificationsFindUniqueArgs>(args: SelectSubset<T, notificationsFindUniqueArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notifications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {notificationsFindUniqueOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends notificationsFindUniqueOrThrowArgs>(args: SelectSubset<T, notificationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends notificationsFindFirstArgs>(args?: SelectSubset<T, notificationsFindFirstArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends notificationsFindFirstOrThrowArgs>(args?: SelectSubset<T, notificationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notifications.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notifications.findMany({ take: 10 })
     * 
     * // Only select the `location`
     * const notificationsWithLocationOnly = await prisma.notifications.findMany({ select: { location: true } })
     * 
     */
    findMany<T extends notificationsFindManyArgs>(args?: SelectSubset<T, notificationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notifications.
     * @param {notificationsCreateArgs} args - Arguments to create a Notifications.
     * @example
     * // Create one Notifications
     * const Notifications = await prisma.notifications.create({
     *   data: {
     *     // ... data to create a Notifications
     *   }
     * })
     * 
     */
    create<T extends notificationsCreateArgs>(args: SelectSubset<T, notificationsCreateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {notificationsCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notifications = await prisma.notifications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends notificationsCreateManyArgs>(args?: SelectSubset<T, notificationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {notificationsCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notifications = await prisma.notifications.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `location`
     * const notificationsWithLocationOnly = await prisma.notifications.createManyAndReturn({
     *   select: { location: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends notificationsCreateManyAndReturnArgs>(args?: SelectSubset<T, notificationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notifications.
     * @param {notificationsDeleteArgs} args - Arguments to delete one Notifications.
     * @example
     * // Delete one Notifications
     * const Notifications = await prisma.notifications.delete({
     *   where: {
     *     // ... filter to delete one Notifications
     *   }
     * })
     * 
     */
    delete<T extends notificationsDeleteArgs>(args: SelectSubset<T, notificationsDeleteArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notifications.
     * @param {notificationsUpdateArgs} args - Arguments to update one Notifications.
     * @example
     * // Update one Notifications
     * const notifications = await prisma.notifications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends notificationsUpdateArgs>(args: SelectSubset<T, notificationsUpdateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {notificationsDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notifications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends notificationsDeleteManyArgs>(args?: SelectSubset<T, notificationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notifications = await prisma.notifications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends notificationsUpdateManyArgs>(args: SelectSubset<T, notificationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {notificationsUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notifications = await prisma.notifications.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `location`
     * const notificationsWithLocationOnly = await prisma.notifications.updateManyAndReturn({
     *   select: { location: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends notificationsUpdateManyAndReturnArgs>(args: SelectSubset<T, notificationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notifications.
     * @param {notificationsUpsertArgs} args - Arguments to update or create a Notifications.
     * @example
     * // Update or create a Notifications
     * const notifications = await prisma.notifications.upsert({
     *   create: {
     *     // ... data to create a Notifications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notifications we want to update
     *   }
     * })
     */
    upsert<T extends notificationsUpsertArgs>(args: SelectSubset<T, notificationsUpsertArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notifications.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends notificationsCountArgs>(
      args?: Subset<T, notificationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationsAggregateArgs>(args: Subset<T, NotificationsAggregateArgs>): Prisma.PrismaPromise<GetNotificationsAggregateType<T>>

    /**
     * Group by Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends notificationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: notificationsGroupByArgs['orderBy'] }
        : { orderBy?: notificationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, notificationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the notifications model
   */
  readonly fields: notificationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for notifications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__notificationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the notifications model
   */
  interface notificationsFieldRefs {
    readonly location: FieldRef<"notifications", 'String'>
    readonly lat: FieldRef<"notifications", 'Float'>
    readonly lng: FieldRef<"notifications", 'Float'>
    readonly email: FieldRef<"notifications", 'String'>
    readonly datesubscribed: FieldRef<"notifications", 'String'>
    readonly id: FieldRef<"notifications", 'String'>
    readonly outageinfo: FieldRef<"notifications", 'String'>
  }
    

  // Custom InputTypes
  /**
   * notifications findUnique
   */
  export type notificationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findUniqueOrThrow
   */
  export type notificationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findFirst
   */
  export type notificationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findFirstOrThrow
   */
  export type notificationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findMany
   */
  export type notificationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications create
   */
  export type notificationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data needed to create a notifications.
     */
    data: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
  }

  /**
   * notifications createMany
   */
  export type notificationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many notifications.
     */
    data: notificationsCreateManyInput | notificationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notifications createManyAndReturn
   */
  export type notificationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data used to create many notifications.
     */
    data: notificationsCreateManyInput | notificationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notifications update
   */
  export type notificationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data needed to update a notifications.
     */
    data: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
    /**
     * Choose, which notifications to update.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications updateMany
   */
  export type notificationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
  }

  /**
   * notifications updateManyAndReturn
   */
  export type notificationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
  }

  /**
   * notifications upsert
   */
  export type notificationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The filter to search for the notifications to update in case it exists.
     */
    where: notificationsWhereUniqueInput
    /**
     * In case the notifications found by the `where` argument doesn't exist, create a new notifications with this data.
     */
    create: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
    /**
     * In case the notifications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
  }

  /**
   * notifications delete
   */
  export type notificationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Filter which notifications to delete.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications deleteMany
   */
  export type notificationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to delete
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to delete.
     */
    limit?: number
  }

  /**
   * notifications without action
   */
  export type notificationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
  }


  /**
   * Model outages
   */

  export type AggregateOutages = {
    _count: OutagesCountAggregateOutputType | null
    _avg: OutagesAvgAggregateOutputType | null
    _sum: OutagesSumAggregateOutputType | null
    _min: OutagesMinAggregateOutputType | null
    _max: OutagesMaxAggregateOutputType | null
  }

  export type OutagesAvgAggregateOutputType = {
    affectedcustomers: number | null
    lat: Decimal | null
    lng: Decimal | null
    distance: Decimal | null
  }

  export type OutagesSumAggregateOutputType = {
    affectedcustomers: number | null
    lat: Decimal | null
    lng: Decimal | null
    distance: Decimal | null
  }

  export type OutagesMinAggregateOutputType = {
    id: string | null
    projecttype: string | null
    shutdowndatetime: string | null
    shutdowndate: Date | null
    shutdownperiodstart: string | null
    shutdownperiodend: string | null
    feeder: string | null
    affectedcustomers: number | null
    lat: Decimal | null
    lng: Decimal | null
    distance: Decimal | null
    hull: string | null
    address: string | null
    statustext: string | null
    latestinformation: string | null
    originalshutdowndate: Date | null
    originalshutdownperiodstart: string | null
    originalshutdownperiodend: string | null
    lastmodified: string | null
  }

  export type OutagesMaxAggregateOutputType = {
    id: string | null
    projecttype: string | null
    shutdowndatetime: string | null
    shutdowndate: Date | null
    shutdownperiodstart: string | null
    shutdownperiodend: string | null
    feeder: string | null
    affectedcustomers: number | null
    lat: Decimal | null
    lng: Decimal | null
    distance: Decimal | null
    hull: string | null
    address: string | null
    statustext: string | null
    latestinformation: string | null
    originalshutdowndate: Date | null
    originalshutdownperiodstart: string | null
    originalshutdownperiodend: string | null
    lastmodified: string | null
  }

  export type OutagesCountAggregateOutputType = {
    id: number
    projecttype: number
    shutdowndatetime: number
    shutdowndate: number
    shutdownperiodstart: number
    shutdownperiodend: number
    feeder: number
    affectedcustomers: number
    lat: number
    lng: number
    distance: number
    hull: number
    address: number
    statustext: number
    latestinformation: number
    originalshutdowndate: number
    originalshutdownperiodstart: number
    originalshutdownperiodend: number
    lastmodified: number
    _all: number
  }


  export type OutagesAvgAggregateInputType = {
    affectedcustomers?: true
    lat?: true
    lng?: true
    distance?: true
  }

  export type OutagesSumAggregateInputType = {
    affectedcustomers?: true
    lat?: true
    lng?: true
    distance?: true
  }

  export type OutagesMinAggregateInputType = {
    id?: true
    projecttype?: true
    shutdowndatetime?: true
    shutdowndate?: true
    shutdownperiodstart?: true
    shutdownperiodend?: true
    feeder?: true
    affectedcustomers?: true
    lat?: true
    lng?: true
    distance?: true
    hull?: true
    address?: true
    statustext?: true
    latestinformation?: true
    originalshutdowndate?: true
    originalshutdownperiodstart?: true
    originalshutdownperiodend?: true
    lastmodified?: true
  }

  export type OutagesMaxAggregateInputType = {
    id?: true
    projecttype?: true
    shutdowndatetime?: true
    shutdowndate?: true
    shutdownperiodstart?: true
    shutdownperiodend?: true
    feeder?: true
    affectedcustomers?: true
    lat?: true
    lng?: true
    distance?: true
    hull?: true
    address?: true
    statustext?: true
    latestinformation?: true
    originalshutdowndate?: true
    originalshutdownperiodstart?: true
    originalshutdownperiodend?: true
    lastmodified?: true
  }

  export type OutagesCountAggregateInputType = {
    id?: true
    projecttype?: true
    shutdowndatetime?: true
    shutdowndate?: true
    shutdownperiodstart?: true
    shutdownperiodend?: true
    feeder?: true
    affectedcustomers?: true
    lat?: true
    lng?: true
    distance?: true
    hull?: true
    address?: true
    statustext?: true
    latestinformation?: true
    originalshutdowndate?: true
    originalshutdownperiodstart?: true
    originalshutdownperiodend?: true
    lastmodified?: true
    _all?: true
  }

  export type OutagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which outages to aggregate.
     */
    where?: outagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of outages to fetch.
     */
    orderBy?: outagesOrderByWithRelationInput | outagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: outagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` outages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` outages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned outages
    **/
    _count?: true | OutagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutagesMaxAggregateInputType
  }

  export type GetOutagesAggregateType<T extends OutagesAggregateArgs> = {
        [P in keyof T & keyof AggregateOutages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutages[P]>
      : GetScalarType<T[P], AggregateOutages[P]>
  }




  export type outagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: outagesWhereInput
    orderBy?: outagesOrderByWithAggregationInput | outagesOrderByWithAggregationInput[]
    by: OutagesScalarFieldEnum[] | OutagesScalarFieldEnum
    having?: outagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutagesCountAggregateInputType | true
    _avg?: OutagesAvgAggregateInputType
    _sum?: OutagesSumAggregateInputType
    _min?: OutagesMinAggregateInputType
    _max?: OutagesMaxAggregateInputType
  }

  export type OutagesGroupByOutputType = {
    id: string
    projecttype: string | null
    shutdowndatetime: string | null
    shutdowndate: Date | null
    shutdownperiodstart: string | null
    shutdownperiodend: string | null
    feeder: string | null
    affectedcustomers: number | null
    lat: Decimal | null
    lng: Decimal | null
    distance: Decimal | null
    hull: string | null
    address: string | null
    statustext: string | null
    latestinformation: string | null
    originalshutdowndate: Date | null
    originalshutdownperiodstart: string | null
    originalshutdownperiodend: string | null
    lastmodified: string | null
    _count: OutagesCountAggregateOutputType | null
    _avg: OutagesAvgAggregateOutputType | null
    _sum: OutagesSumAggregateOutputType | null
    _min: OutagesMinAggregateOutputType | null
    _max: OutagesMaxAggregateOutputType | null
  }

  type GetOutagesGroupByPayload<T extends outagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutagesGroupByOutputType[P]>
            : GetScalarType<T[P], OutagesGroupByOutputType[P]>
        }
      >
    >


  export type outagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projecttype?: boolean
    shutdowndatetime?: boolean
    shutdowndate?: boolean
    shutdownperiodstart?: boolean
    shutdownperiodend?: boolean
    feeder?: boolean
    affectedcustomers?: boolean
    lat?: boolean
    lng?: boolean
    distance?: boolean
    hull?: boolean
    address?: boolean
    statustext?: boolean
    latestinformation?: boolean
    originalshutdowndate?: boolean
    originalshutdownperiodstart?: boolean
    originalshutdownperiodend?: boolean
    lastmodified?: boolean
  }, ExtArgs["result"]["outages"]>

  export type outagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projecttype?: boolean
    shutdowndatetime?: boolean
    shutdowndate?: boolean
    shutdownperiodstart?: boolean
    shutdownperiodend?: boolean
    feeder?: boolean
    affectedcustomers?: boolean
    lat?: boolean
    lng?: boolean
    distance?: boolean
    hull?: boolean
    address?: boolean
    statustext?: boolean
    latestinformation?: boolean
    originalshutdowndate?: boolean
    originalshutdownperiodstart?: boolean
    originalshutdownperiodend?: boolean
    lastmodified?: boolean
  }, ExtArgs["result"]["outages"]>

  export type outagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projecttype?: boolean
    shutdowndatetime?: boolean
    shutdowndate?: boolean
    shutdownperiodstart?: boolean
    shutdownperiodend?: boolean
    feeder?: boolean
    affectedcustomers?: boolean
    lat?: boolean
    lng?: boolean
    distance?: boolean
    hull?: boolean
    address?: boolean
    statustext?: boolean
    latestinformation?: boolean
    originalshutdowndate?: boolean
    originalshutdownperiodstart?: boolean
    originalshutdownperiodend?: boolean
    lastmodified?: boolean
  }, ExtArgs["result"]["outages"]>

  export type outagesSelectScalar = {
    id?: boolean
    projecttype?: boolean
    shutdowndatetime?: boolean
    shutdowndate?: boolean
    shutdownperiodstart?: boolean
    shutdownperiodend?: boolean
    feeder?: boolean
    affectedcustomers?: boolean
    lat?: boolean
    lng?: boolean
    distance?: boolean
    hull?: boolean
    address?: boolean
    statustext?: boolean
    latestinformation?: boolean
    originalshutdowndate?: boolean
    originalshutdownperiodstart?: boolean
    originalshutdownperiodend?: boolean
    lastmodified?: boolean
  }

  export type outagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projecttype" | "shutdowndatetime" | "shutdowndate" | "shutdownperiodstart" | "shutdownperiodend" | "feeder" | "affectedcustomers" | "lat" | "lng" | "distance" | "hull" | "address" | "statustext" | "latestinformation" | "originalshutdowndate" | "originalshutdownperiodstart" | "originalshutdownperiodend" | "lastmodified", ExtArgs["result"]["outages"]>

  export type $outagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "outages"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projecttype: string | null
      shutdowndatetime: string | null
      shutdowndate: Date | null
      shutdownperiodstart: string | null
      shutdownperiodend: string | null
      feeder: string | null
      affectedcustomers: number | null
      lat: Prisma.Decimal | null
      lng: Prisma.Decimal | null
      distance: Prisma.Decimal | null
      hull: string | null
      address: string | null
      statustext: string | null
      latestinformation: string | null
      originalshutdowndate: Date | null
      originalshutdownperiodstart: string | null
      originalshutdownperiodend: string | null
      lastmodified: string | null
    }, ExtArgs["result"]["outages"]>
    composites: {}
  }

  type outagesGetPayload<S extends boolean | null | undefined | outagesDefaultArgs> = $Result.GetResult<Prisma.$outagesPayload, S>

  type outagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<outagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutagesCountAggregateInputType | true
    }

  export interface outagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['outages'], meta: { name: 'outages' } }
    /**
     * Find zero or one Outages that matches the filter.
     * @param {outagesFindUniqueArgs} args - Arguments to find a Outages
     * @example
     * // Get one Outages
     * const outages = await prisma.outages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends outagesFindUniqueArgs>(args: SelectSubset<T, outagesFindUniqueArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Outages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {outagesFindUniqueOrThrowArgs} args - Arguments to find a Outages
     * @example
     * // Get one Outages
     * const outages = await prisma.outages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends outagesFindUniqueOrThrowArgs>(args: SelectSubset<T, outagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {outagesFindFirstArgs} args - Arguments to find a Outages
     * @example
     * // Get one Outages
     * const outages = await prisma.outages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends outagesFindFirstArgs>(args?: SelectSubset<T, outagesFindFirstArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {outagesFindFirstOrThrowArgs} args - Arguments to find a Outages
     * @example
     * // Get one Outages
     * const outages = await prisma.outages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends outagesFindFirstOrThrowArgs>(args?: SelectSubset<T, outagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Outages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {outagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Outages
     * const outages = await prisma.outages.findMany()
     * 
     * // Get first 10 Outages
     * const outages = await prisma.outages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outagesWithIdOnly = await prisma.outages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends outagesFindManyArgs>(args?: SelectSubset<T, outagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Outages.
     * @param {outagesCreateArgs} args - Arguments to create a Outages.
     * @example
     * // Create one Outages
     * const Outages = await prisma.outages.create({
     *   data: {
     *     // ... data to create a Outages
     *   }
     * })
     * 
     */
    create<T extends outagesCreateArgs>(args: SelectSubset<T, outagesCreateArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Outages.
     * @param {outagesCreateManyArgs} args - Arguments to create many Outages.
     * @example
     * // Create many Outages
     * const outages = await prisma.outages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends outagesCreateManyArgs>(args?: SelectSubset<T, outagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Outages and returns the data saved in the database.
     * @param {outagesCreateManyAndReturnArgs} args - Arguments to create many Outages.
     * @example
     * // Create many Outages
     * const outages = await prisma.outages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Outages and only return the `id`
     * const outagesWithIdOnly = await prisma.outages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends outagesCreateManyAndReturnArgs>(args?: SelectSubset<T, outagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Outages.
     * @param {outagesDeleteArgs} args - Arguments to delete one Outages.
     * @example
     * // Delete one Outages
     * const Outages = await prisma.outages.delete({
     *   where: {
     *     // ... filter to delete one Outages
     *   }
     * })
     * 
     */
    delete<T extends outagesDeleteArgs>(args: SelectSubset<T, outagesDeleteArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Outages.
     * @param {outagesUpdateArgs} args - Arguments to update one Outages.
     * @example
     * // Update one Outages
     * const outages = await prisma.outages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends outagesUpdateArgs>(args: SelectSubset<T, outagesUpdateArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Outages.
     * @param {outagesDeleteManyArgs} args - Arguments to filter Outages to delete.
     * @example
     * // Delete a few Outages
     * const { count } = await prisma.outages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends outagesDeleteManyArgs>(args?: SelectSubset<T, outagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {outagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Outages
     * const outages = await prisma.outages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends outagesUpdateManyArgs>(args: SelectSubset<T, outagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outages and returns the data updated in the database.
     * @param {outagesUpdateManyAndReturnArgs} args - Arguments to update many Outages.
     * @example
     * // Update many Outages
     * const outages = await prisma.outages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Outages and only return the `id`
     * const outagesWithIdOnly = await prisma.outages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends outagesUpdateManyAndReturnArgs>(args: SelectSubset<T, outagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Outages.
     * @param {outagesUpsertArgs} args - Arguments to update or create a Outages.
     * @example
     * // Update or create a Outages
     * const outages = await prisma.outages.upsert({
     *   create: {
     *     // ... data to create a Outages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Outages we want to update
     *   }
     * })
     */
    upsert<T extends outagesUpsertArgs>(args: SelectSubset<T, outagesUpsertArgs<ExtArgs>>): Prisma__outagesClient<$Result.GetResult<Prisma.$outagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Outages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {outagesCountArgs} args - Arguments to filter Outages to count.
     * @example
     * // Count the number of Outages
     * const count = await prisma.outages.count({
     *   where: {
     *     // ... the filter for the Outages we want to count
     *   }
     * })
    **/
    count<T extends outagesCountArgs>(
      args?: Subset<T, outagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Outages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutagesAggregateArgs>(args: Subset<T, OutagesAggregateArgs>): Prisma.PrismaPromise<GetOutagesAggregateType<T>>

    /**
     * Group by Outages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {outagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends outagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: outagesGroupByArgs['orderBy'] }
        : { orderBy?: outagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, outagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the outages model
   */
  readonly fields: outagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for outages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__outagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the outages model
   */
  interface outagesFieldRefs {
    readonly id: FieldRef<"outages", 'String'>
    readonly projecttype: FieldRef<"outages", 'String'>
    readonly shutdowndatetime: FieldRef<"outages", 'String'>
    readonly shutdowndate: FieldRef<"outages", 'DateTime'>
    readonly shutdownperiodstart: FieldRef<"outages", 'String'>
    readonly shutdownperiodend: FieldRef<"outages", 'String'>
    readonly feeder: FieldRef<"outages", 'String'>
    readonly affectedcustomers: FieldRef<"outages", 'Int'>
    readonly lat: FieldRef<"outages", 'Decimal'>
    readonly lng: FieldRef<"outages", 'Decimal'>
    readonly distance: FieldRef<"outages", 'Decimal'>
    readonly hull: FieldRef<"outages", 'String'>
    readonly address: FieldRef<"outages", 'String'>
    readonly statustext: FieldRef<"outages", 'String'>
    readonly latestinformation: FieldRef<"outages", 'String'>
    readonly originalshutdowndate: FieldRef<"outages", 'DateTime'>
    readonly originalshutdownperiodstart: FieldRef<"outages", 'String'>
    readonly originalshutdownperiodend: FieldRef<"outages", 'String'>
    readonly lastmodified: FieldRef<"outages", 'String'>
  }
    

  // Custom InputTypes
  /**
   * outages findUnique
   */
  export type outagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * Filter, which outages to fetch.
     */
    where: outagesWhereUniqueInput
  }

  /**
   * outages findUniqueOrThrow
   */
  export type outagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * Filter, which outages to fetch.
     */
    where: outagesWhereUniqueInput
  }

  /**
   * outages findFirst
   */
  export type outagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * Filter, which outages to fetch.
     */
    where?: outagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of outages to fetch.
     */
    orderBy?: outagesOrderByWithRelationInput | outagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for outages.
     */
    cursor?: outagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` outages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` outages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of outages.
     */
    distinct?: OutagesScalarFieldEnum | OutagesScalarFieldEnum[]
  }

  /**
   * outages findFirstOrThrow
   */
  export type outagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * Filter, which outages to fetch.
     */
    where?: outagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of outages to fetch.
     */
    orderBy?: outagesOrderByWithRelationInput | outagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for outages.
     */
    cursor?: outagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` outages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` outages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of outages.
     */
    distinct?: OutagesScalarFieldEnum | OutagesScalarFieldEnum[]
  }

  /**
   * outages findMany
   */
  export type outagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * Filter, which outages to fetch.
     */
    where?: outagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of outages to fetch.
     */
    orderBy?: outagesOrderByWithRelationInput | outagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing outages.
     */
    cursor?: outagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` outages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` outages.
     */
    skip?: number
    distinct?: OutagesScalarFieldEnum | OutagesScalarFieldEnum[]
  }

  /**
   * outages create
   */
  export type outagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * The data needed to create a outages.
     */
    data: XOR<outagesCreateInput, outagesUncheckedCreateInput>
  }

  /**
   * outages createMany
   */
  export type outagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many outages.
     */
    data: outagesCreateManyInput | outagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * outages createManyAndReturn
   */
  export type outagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * The data used to create many outages.
     */
    data: outagesCreateManyInput | outagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * outages update
   */
  export type outagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * The data needed to update a outages.
     */
    data: XOR<outagesUpdateInput, outagesUncheckedUpdateInput>
    /**
     * Choose, which outages to update.
     */
    where: outagesWhereUniqueInput
  }

  /**
   * outages updateMany
   */
  export type outagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update outages.
     */
    data: XOR<outagesUpdateManyMutationInput, outagesUncheckedUpdateManyInput>
    /**
     * Filter which outages to update
     */
    where?: outagesWhereInput
    /**
     * Limit how many outages to update.
     */
    limit?: number
  }

  /**
   * outages updateManyAndReturn
   */
  export type outagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * The data used to update outages.
     */
    data: XOR<outagesUpdateManyMutationInput, outagesUncheckedUpdateManyInput>
    /**
     * Filter which outages to update
     */
    where?: outagesWhereInput
    /**
     * Limit how many outages to update.
     */
    limit?: number
  }

  /**
   * outages upsert
   */
  export type outagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * The filter to search for the outages to update in case it exists.
     */
    where: outagesWhereUniqueInput
    /**
     * In case the outages found by the `where` argument doesn't exist, create a new outages with this data.
     */
    create: XOR<outagesCreateInput, outagesUncheckedCreateInput>
    /**
     * In case the outages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<outagesUpdateInput, outagesUncheckedUpdateInput>
  }

  /**
   * outages delete
   */
  export type outagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
    /**
     * Filter which outages to delete.
     */
    where: outagesWhereUniqueInput
  }

  /**
   * outages deleteMany
   */
  export type outagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which outages to delete
     */
    where?: outagesWhereInput
    /**
     * Limit how many outages to delete.
     */
    limit?: number
  }

  /**
   * outages without action
   */
  export type outagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the outages
     */
    select?: outagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the outages
     */
    omit?: outagesOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const NotificationsScalarFieldEnum: {
    location: 'location',
    lat: 'lat',
    lng: 'lng',
    email: 'email',
    datesubscribed: 'datesubscribed',
    id: 'id',
    outageinfo: 'outageinfo'
  };

  export type NotificationsScalarFieldEnum = (typeof NotificationsScalarFieldEnum)[keyof typeof NotificationsScalarFieldEnum]


  export const OutagesScalarFieldEnum: {
    id: 'id',
    projecttype: 'projecttype',
    shutdowndatetime: 'shutdowndatetime',
    shutdowndate: 'shutdowndate',
    shutdownperiodstart: 'shutdownperiodstart',
    shutdownperiodend: 'shutdownperiodend',
    feeder: 'feeder',
    affectedcustomers: 'affectedcustomers',
    lat: 'lat',
    lng: 'lng',
    distance: 'distance',
    hull: 'hull',
    address: 'address',
    statustext: 'statustext',
    latestinformation: 'latestinformation',
    originalshutdowndate: 'originalshutdowndate',
    originalshutdownperiodstart: 'originalshutdownperiodstart',
    originalshutdownperiodend: 'originalshutdownperiodend',
    lastmodified: 'lastmodified'
  };

  export type OutagesScalarFieldEnum = (typeof OutagesScalarFieldEnum)[keyof typeof OutagesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
  /**
   * Deep Input Types
   */


  export type notificationsWhereInput = {
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    location?: StringFilter<"notifications"> | string
    lat?: FloatNullableFilter<"notifications"> | number | null
    lng?: FloatNullableFilter<"notifications"> | number | null
    email?: StringFilter<"notifications"> | string
    datesubscribed?: StringFilter<"notifications"> | string
    id?: StringFilter<"notifications"> | string
    outageinfo?: StringNullableFilter<"notifications"> | string | null
  }

  export type notificationsOrderByWithRelationInput = {
    location?: SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    email?: SortOrder
    datesubscribed?: SortOrder
    id?: SortOrder
    outageinfo?: SortOrderInput | SortOrder
  }

  export type notificationsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    location?: StringFilter<"notifications"> | string
    lat?: FloatNullableFilter<"notifications"> | number | null
    lng?: FloatNullableFilter<"notifications"> | number | null
    email?: StringFilter<"notifications"> | string
    datesubscribed?: StringFilter<"notifications"> | string
    outageinfo?: StringNullableFilter<"notifications"> | string | null
  }, "id">

  export type notificationsOrderByWithAggregationInput = {
    location?: SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    email?: SortOrder
    datesubscribed?: SortOrder
    id?: SortOrder
    outageinfo?: SortOrderInput | SortOrder
    _count?: notificationsCountOrderByAggregateInput
    _avg?: notificationsAvgOrderByAggregateInput
    _max?: notificationsMaxOrderByAggregateInput
    _min?: notificationsMinOrderByAggregateInput
    _sum?: notificationsSumOrderByAggregateInput
  }

  export type notificationsScalarWhereWithAggregatesInput = {
    AND?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    OR?: notificationsScalarWhereWithAggregatesInput[]
    NOT?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    location?: StringWithAggregatesFilter<"notifications"> | string
    lat?: FloatNullableWithAggregatesFilter<"notifications"> | number | null
    lng?: FloatNullableWithAggregatesFilter<"notifications"> | number | null
    email?: StringWithAggregatesFilter<"notifications"> | string
    datesubscribed?: StringWithAggregatesFilter<"notifications"> | string
    id?: StringWithAggregatesFilter<"notifications"> | string
    outageinfo?: StringNullableWithAggregatesFilter<"notifications"> | string | null
  }

  export type outagesWhereInput = {
    AND?: outagesWhereInput | outagesWhereInput[]
    OR?: outagesWhereInput[]
    NOT?: outagesWhereInput | outagesWhereInput[]
    id?: StringFilter<"outages"> | string
    projecttype?: StringNullableFilter<"outages"> | string | null
    shutdowndatetime?: StringNullableFilter<"outages"> | string | null
    shutdowndate?: DateTimeNullableFilter<"outages"> | Date | string | null
    shutdownperiodstart?: StringNullableFilter<"outages"> | string | null
    shutdownperiodend?: StringNullableFilter<"outages"> | string | null
    feeder?: StringNullableFilter<"outages"> | string | null
    affectedcustomers?: IntNullableFilter<"outages"> | number | null
    lat?: DecimalNullableFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    lng?: DecimalNullableFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    distance?: DecimalNullableFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    hull?: StringNullableFilter<"outages"> | string | null
    address?: StringNullableFilter<"outages"> | string | null
    statustext?: StringNullableFilter<"outages"> | string | null
    latestinformation?: StringNullableFilter<"outages"> | string | null
    originalshutdowndate?: DateTimeNullableFilter<"outages"> | Date | string | null
    originalshutdownperiodstart?: StringNullableFilter<"outages"> | string | null
    originalshutdownperiodend?: StringNullableFilter<"outages"> | string | null
    lastmodified?: StringNullableFilter<"outages"> | string | null
  }

  export type outagesOrderByWithRelationInput = {
    id?: SortOrder
    projecttype?: SortOrderInput | SortOrder
    shutdowndatetime?: SortOrderInput | SortOrder
    shutdowndate?: SortOrderInput | SortOrder
    shutdownperiodstart?: SortOrderInput | SortOrder
    shutdownperiodend?: SortOrderInput | SortOrder
    feeder?: SortOrderInput | SortOrder
    affectedcustomers?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    hull?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    statustext?: SortOrderInput | SortOrder
    latestinformation?: SortOrderInput | SortOrder
    originalshutdowndate?: SortOrderInput | SortOrder
    originalshutdownperiodstart?: SortOrderInput | SortOrder
    originalshutdownperiodend?: SortOrderInput | SortOrder
    lastmodified?: SortOrderInput | SortOrder
  }

  export type outagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    id_lastmodified?: outagesIdLastmodifiedCompoundUniqueInput
    AND?: outagesWhereInput | outagesWhereInput[]
    OR?: outagesWhereInput[]
    NOT?: outagesWhereInput | outagesWhereInput[]
    projecttype?: StringNullableFilter<"outages"> | string | null
    shutdowndatetime?: StringNullableFilter<"outages"> | string | null
    shutdowndate?: DateTimeNullableFilter<"outages"> | Date | string | null
    shutdownperiodstart?: StringNullableFilter<"outages"> | string | null
    shutdownperiodend?: StringNullableFilter<"outages"> | string | null
    feeder?: StringNullableFilter<"outages"> | string | null
    affectedcustomers?: IntNullableFilter<"outages"> | number | null
    lat?: DecimalNullableFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    lng?: DecimalNullableFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    distance?: DecimalNullableFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    hull?: StringNullableFilter<"outages"> | string | null
    address?: StringNullableFilter<"outages"> | string | null
    statustext?: StringNullableFilter<"outages"> | string | null
    latestinformation?: StringNullableFilter<"outages"> | string | null
    originalshutdowndate?: DateTimeNullableFilter<"outages"> | Date | string | null
    originalshutdownperiodstart?: StringNullableFilter<"outages"> | string | null
    originalshutdownperiodend?: StringNullableFilter<"outages"> | string | null
    lastmodified?: StringNullableFilter<"outages"> | string | null
  }, "id" | "id_lastmodified">

  export type outagesOrderByWithAggregationInput = {
    id?: SortOrder
    projecttype?: SortOrderInput | SortOrder
    shutdowndatetime?: SortOrderInput | SortOrder
    shutdowndate?: SortOrderInput | SortOrder
    shutdownperiodstart?: SortOrderInput | SortOrder
    shutdownperiodend?: SortOrderInput | SortOrder
    feeder?: SortOrderInput | SortOrder
    affectedcustomers?: SortOrderInput | SortOrder
    lat?: SortOrderInput | SortOrder
    lng?: SortOrderInput | SortOrder
    distance?: SortOrderInput | SortOrder
    hull?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    statustext?: SortOrderInput | SortOrder
    latestinformation?: SortOrderInput | SortOrder
    originalshutdowndate?: SortOrderInput | SortOrder
    originalshutdownperiodstart?: SortOrderInput | SortOrder
    originalshutdownperiodend?: SortOrderInput | SortOrder
    lastmodified?: SortOrderInput | SortOrder
    _count?: outagesCountOrderByAggregateInput
    _avg?: outagesAvgOrderByAggregateInput
    _max?: outagesMaxOrderByAggregateInput
    _min?: outagesMinOrderByAggregateInput
    _sum?: outagesSumOrderByAggregateInput
  }

  export type outagesScalarWhereWithAggregatesInput = {
    AND?: outagesScalarWhereWithAggregatesInput | outagesScalarWhereWithAggregatesInput[]
    OR?: outagesScalarWhereWithAggregatesInput[]
    NOT?: outagesScalarWhereWithAggregatesInput | outagesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"outages"> | string
    projecttype?: StringNullableWithAggregatesFilter<"outages"> | string | null
    shutdowndatetime?: StringNullableWithAggregatesFilter<"outages"> | string | null
    shutdowndate?: DateTimeNullableWithAggregatesFilter<"outages"> | Date | string | null
    shutdownperiodstart?: StringNullableWithAggregatesFilter<"outages"> | string | null
    shutdownperiodend?: StringNullableWithAggregatesFilter<"outages"> | string | null
    feeder?: StringNullableWithAggregatesFilter<"outages"> | string | null
    affectedcustomers?: IntNullableWithAggregatesFilter<"outages"> | number | null
    lat?: DecimalNullableWithAggregatesFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    lng?: DecimalNullableWithAggregatesFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    distance?: DecimalNullableWithAggregatesFilter<"outages"> | Decimal | DecimalJsLike | number | string | null
    hull?: StringNullableWithAggregatesFilter<"outages"> | string | null
    address?: StringNullableWithAggregatesFilter<"outages"> | string | null
    statustext?: StringNullableWithAggregatesFilter<"outages"> | string | null
    latestinformation?: StringNullableWithAggregatesFilter<"outages"> | string | null
    originalshutdowndate?: DateTimeNullableWithAggregatesFilter<"outages"> | Date | string | null
    originalshutdownperiodstart?: StringNullableWithAggregatesFilter<"outages"> | string | null
    originalshutdownperiodend?: StringNullableWithAggregatesFilter<"outages"> | string | null
    lastmodified?: StringNullableWithAggregatesFilter<"outages"> | string | null
  }

  export type notificationsCreateInput = {
    location: string
    lat?: number | null
    lng?: number | null
    email: string
    datesubscribed: string
    id?: string
    outageinfo?: string | null
  }

  export type notificationsUncheckedCreateInput = {
    location: string
    lat?: number | null
    lng?: number | null
    email: string
    datesubscribed: string
    id?: string
    outageinfo?: string | null
  }

  export type notificationsUpdateInput = {
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    datesubscribed?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    outageinfo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type notificationsUncheckedUpdateInput = {
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    datesubscribed?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    outageinfo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type notificationsCreateManyInput = {
    location: string
    lat?: number | null
    lng?: number | null
    email: string
    datesubscribed: string
    id?: string
    outageinfo?: string | null
  }

  export type notificationsUpdateManyMutationInput = {
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    datesubscribed?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    outageinfo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type notificationsUncheckedUpdateManyInput = {
    location?: StringFieldUpdateOperationsInput | string
    lat?: NullableFloatFieldUpdateOperationsInput | number | null
    lng?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    datesubscribed?: StringFieldUpdateOperationsInput | string
    id?: StringFieldUpdateOperationsInput | string
    outageinfo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type outagesCreateInput = {
    id: string
    projecttype?: string | null
    shutdowndatetime?: string | null
    shutdowndate?: Date | string | null
    shutdownperiodstart?: string | null
    shutdownperiodend?: string | null
    feeder?: string | null
    affectedcustomers?: number | null
    lat?: Decimal | DecimalJsLike | number | string | null
    lng?: Decimal | DecimalJsLike | number | string | null
    distance?: Decimal | DecimalJsLike | number | string | null
    hull?: string | null
    address?: string | null
    statustext?: string | null
    latestinformation?: string | null
    originalshutdowndate?: Date | string | null
    originalshutdownperiodstart?: string | null
    originalshutdownperiodend?: string | null
    lastmodified?: string | null
  }

  export type outagesUncheckedCreateInput = {
    id: string
    projecttype?: string | null
    shutdowndatetime?: string | null
    shutdowndate?: Date | string | null
    shutdownperiodstart?: string | null
    shutdownperiodend?: string | null
    feeder?: string | null
    affectedcustomers?: number | null
    lat?: Decimal | DecimalJsLike | number | string | null
    lng?: Decimal | DecimalJsLike | number | string | null
    distance?: Decimal | DecimalJsLike | number | string | null
    hull?: string | null
    address?: string | null
    statustext?: string | null
    latestinformation?: string | null
    originalshutdowndate?: Date | string | null
    originalshutdownperiodstart?: string | null
    originalshutdownperiodend?: string | null
    lastmodified?: string | null
  }

  export type outagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projecttype?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndatetime?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    shutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    feeder?: NullableStringFieldUpdateOperationsInput | string | null
    affectedcustomers?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    distance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hull?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    statustext?: NullableStringFieldUpdateOperationsInput | string | null
    latestinformation?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalshutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    lastmodified?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type outagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projecttype?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndatetime?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    shutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    feeder?: NullableStringFieldUpdateOperationsInput | string | null
    affectedcustomers?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    distance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hull?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    statustext?: NullableStringFieldUpdateOperationsInput | string | null
    latestinformation?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalshutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    lastmodified?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type outagesCreateManyInput = {
    id: string
    projecttype?: string | null
    shutdowndatetime?: string | null
    shutdowndate?: Date | string | null
    shutdownperiodstart?: string | null
    shutdownperiodend?: string | null
    feeder?: string | null
    affectedcustomers?: number | null
    lat?: Decimal | DecimalJsLike | number | string | null
    lng?: Decimal | DecimalJsLike | number | string | null
    distance?: Decimal | DecimalJsLike | number | string | null
    hull?: string | null
    address?: string | null
    statustext?: string | null
    latestinformation?: string | null
    originalshutdowndate?: Date | string | null
    originalshutdownperiodstart?: string | null
    originalshutdownperiodend?: string | null
    lastmodified?: string | null
  }

  export type outagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projecttype?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndatetime?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    shutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    feeder?: NullableStringFieldUpdateOperationsInput | string | null
    affectedcustomers?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    distance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hull?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    statustext?: NullableStringFieldUpdateOperationsInput | string | null
    latestinformation?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalshutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    lastmodified?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type outagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projecttype?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndatetime?: NullableStringFieldUpdateOperationsInput | string | null
    shutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    shutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    feeder?: NullableStringFieldUpdateOperationsInput | string | null
    affectedcustomers?: NullableIntFieldUpdateOperationsInput | number | null
    lat?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lng?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    distance?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hull?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    statustext?: NullableStringFieldUpdateOperationsInput | string | null
    latestinformation?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdowndate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalshutdownperiodstart?: NullableStringFieldUpdateOperationsInput | string | null
    originalshutdownperiodend?: NullableStringFieldUpdateOperationsInput | string | null
    lastmodified?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type notificationsCountOrderByAggregateInput = {
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    email?: SortOrder
    datesubscribed?: SortOrder
    id?: SortOrder
    outageinfo?: SortOrder
  }

  export type notificationsAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type notificationsMaxOrderByAggregateInput = {
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    email?: SortOrder
    datesubscribed?: SortOrder
    id?: SortOrder
    outageinfo?: SortOrder
  }

  export type notificationsMinOrderByAggregateInput = {
    location?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    email?: SortOrder
    datesubscribed?: SortOrder
    id?: SortOrder
    outageinfo?: SortOrder
  }

  export type notificationsSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type outagesIdLastmodifiedCompoundUniqueInput = {
    id: string
    lastmodified: string
  }

  export type outagesCountOrderByAggregateInput = {
    id?: SortOrder
    projecttype?: SortOrder
    shutdowndatetime?: SortOrder
    shutdowndate?: SortOrder
    shutdownperiodstart?: SortOrder
    shutdownperiodend?: SortOrder
    feeder?: SortOrder
    affectedcustomers?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    distance?: SortOrder
    hull?: SortOrder
    address?: SortOrder
    statustext?: SortOrder
    latestinformation?: SortOrder
    originalshutdowndate?: SortOrder
    originalshutdownperiodstart?: SortOrder
    originalshutdownperiodend?: SortOrder
    lastmodified?: SortOrder
  }

  export type outagesAvgOrderByAggregateInput = {
    affectedcustomers?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    distance?: SortOrder
  }

  export type outagesMaxOrderByAggregateInput = {
    id?: SortOrder
    projecttype?: SortOrder
    shutdowndatetime?: SortOrder
    shutdowndate?: SortOrder
    shutdownperiodstart?: SortOrder
    shutdownperiodend?: SortOrder
    feeder?: SortOrder
    affectedcustomers?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    distance?: SortOrder
    hull?: SortOrder
    address?: SortOrder
    statustext?: SortOrder
    latestinformation?: SortOrder
    originalshutdowndate?: SortOrder
    originalshutdownperiodstart?: SortOrder
    originalshutdownperiodend?: SortOrder
    lastmodified?: SortOrder
  }

  export type outagesMinOrderByAggregateInput = {
    id?: SortOrder
    projecttype?: SortOrder
    shutdowndatetime?: SortOrder
    shutdowndate?: SortOrder
    shutdownperiodstart?: SortOrder
    shutdownperiodend?: SortOrder
    feeder?: SortOrder
    affectedcustomers?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    distance?: SortOrder
    hull?: SortOrder
    address?: SortOrder
    statustext?: SortOrder
    latestinformation?: SortOrder
    originalshutdowndate?: SortOrder
    originalshutdownperiodstart?: SortOrder
    originalshutdownperiodend?: SortOrder
    lastmodified?: SortOrder
  }

  export type outagesSumOrderByAggregateInput = {
    affectedcustomers?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    distance?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}