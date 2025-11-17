# Clean Architecture Structure

このプロジェクトは**Clean Architecture**の原則に従って構造化されています。

## アーキテクチャ概要

Clean Architectureは、ビジネスロジックを外部の実装詳細から分離し、保守性、テスト容易性、拡張性を高めることを目的としたアーキテクチャパターンです。

### 依存関係のルール

- 外側の層は内側の層に依存できますが、内側の層は外側の層に依存してはいけません
- ビジネスロジック(Domain層)は他の層から完全に独立しています

```
┌────────────────────────────────────────────┐
│         Presentation Layer (UI)            │
│     ┌────────────────────────────────┐    │
│     │   Infrastructure Layer         │    │
│     │  ┌──────────────────────────┐  │    │
│     │  │  Application Layer       │  │    │
│     │  │  ┌────────────────────┐  │  │    │
│     │  │  │   Domain Layer     │  │  │    │
│     │  │  │  (Entities, VOs)   │  │  │    │
│     │  │  └────────────────────┘  │  │    │
│     │  └──────────────────────────┘  │    │
│     └────────────────────────────────┘    │
└────────────────────────────────────────────┘
```

## ディレクトリ構造

```
src/
├── domain/                 # Domain Layer (最も内側の層)
│   ├── entities/          # ドメインエンティティ
│   ├── value-objects/     # ドメインバリューオブジェクト
│   ├── repositories/      # リポジトリインターフェース(ポート)
│   └── services/          # ドメインサービス
│
├── application/            # Application Layer (ユースケース層)
│   ├── usecases/          # ユースケース実装
│   ├── ports/             # ユースケースインターフェース(ポート)
│   └── dto/               # データ転送オブジェクト
│       └── vos/
│           ├── requests/  # リクエストDTO
│           └── responses/ # レスポンスDTO
│
├── infrastructure/         # Infrastructure Layer (外部実装層)
│   ├── http/              # HTTPクライアント実装
│   │   └── BaseRepository.ts
│   ├── repositories/      # リポジトリ実装(アダプター)
│   ├── state/             # 状態管理(MobX)
│   ├── config/            # 設定ファイル
│   └── utils/             # 共通ユーティリティ
│       ├── date/
│       ├── string/
│       └── download/
│
├── presentation/           # Presentation Layer (UI層)
│   ├── pages/             # ページコンポーネント
│   ├── components/        # UIコンポーネント
│   └── hooks/             # カスタムフック
│
├── di/                     # Dependency Injection
│   ├── RepositoryFactory.ts
│   └── UseCaseFactory.ts
│
├── assets/                 # 静的リソース
├── app.tsx                 # アプリケーションエントリーポイント
└── index.tsx               # ReactDOM エントリーポイント
```

## 各層の責務

### 1. Domain Layer (ドメイン層)

**責務**: エンタープライズビジネスルール

- **entities/**: ビジネスエンティティとビジネスルールを含む
- **value-objects/**: 不変のドメインバリューオブジェクト
- **repositories/**: データアクセスのインターフェース定義(実装は含まない)
- **services/**: 複数のエンティティにまたがるビジネスロジック

**依存関係**: なし(完全に独立)

### 2. Application Layer (アプリケーション層)

**責務**: アプリケーションビジネスルール

- **usecases/**: 特定のユースケースの実装
- **ports/**: ユースケースのインターフェース定義
- **dto/**: 層間のデータ転送オブジェクト

**依存関係**: Domain層のみ

**例**:
```typescript
// application/usecases/LoginUseCaseImpl.ts
class LoginUseCaseImpl implements LoginUseCase {
  constructor(
    private repository: LoginRepository,  // Domain層のインターフェース
    private loginUser: LoginUser
  ) {}

  async login(args: { email: string; password: string }) {
    const user = await this.repository.login(args)
    this.updateCredential(user, true)
    return user
  }
}
```

### 3. Infrastructure Layer (インフラストラクチャ層)

**責務**: フレームワーク&ドライバー

- **http/**: HTTPクライアントの実装
- **repositories/**: リポジトリインターフェースの具体的な実装
- **state/**: MobXによる状態管理
- **config/**: 環境設定、定数
- **utils/**: 共通ユーティリティ関数

**依存関係**: Domain層、Application層

**例**:
```typescript
// infrastructure/repositories/LoginRepositoryImpl.ts
class LoginRepositoryImpl extends BaseRepository implements LoginRepository {
  async login(args: { email: string; password: string }) {
    return await this._post({ path: "/password", body: args })
  }
}
```

### 4. Presentation Layer (プレゼンテーション層)

**責務**: UIとユーザーインタラクション

- **pages/**: ページレベルのコンポーネント
- **components/**: 再利用可能なUIコンポーネント
- **hooks/**: カスタムReactフック

**依存関係**: Application層、Infrastructure層(DIコンテナ経由)

**例**:
```typescript
// presentation/pages/login/index.tsx
const Login: FC = () => {
  const loginUseCase = UseCaseFactory.createLoginUseCase()

  const handleLogin = async (values: FormikValues) => {
    const { email, password } = values
    const member = await loginUseCase.login({ email, password })
    // ...
  }
}
```

### 5. DI Layer (依存性注入層)

**責務**: オブジェクトの生成と依存関係の注入

- **RepositoryFactory.ts**: リポジトリインスタンスの生成
- **UseCaseFactory.ts**: ユースケースインスタンスの生成

**例**:
```typescript
// di/UseCaseFactory.ts
class UseCaseFactory {
  static createLoginUseCase(): LoginUseCase {
    const loginRepository = RepositoryFactory.createLoginRepository()
    const loginUser = useLoginUser()
    return new LoginUseCaseImpl(loginRepository, loginUser)
  }
}
```

## データフロー

```
User Input
    ↓
┌─────────────────────────┐
│ Presentation Layer      │
│ (React Components)      │
└─────────────────────────┘
    ↓ (calls via DI Factory)
┌─────────────────────────┐
│ Application Layer       │
│ (Use Cases)             │
└─────────────────────────┘
    ↓ (uses interface from Domain)
┌─────────────────────────┐
│ Domain Layer            │
│ (Repository Interface)  │
└─────────────────────────┘
    ↑ (implements)
┌─────────────────────────┐
│ Infrastructure Layer    │
│ (Repository Impl)       │
└─────────────────────────┘
    ↓ (HTTP Request)
External API
```

## Clean Architectureの利点

### 1. **テスト容易性**
- 各層を独立してテスト可能
- モックやスタブを使った単体テストが容易

### 2. **保守性**
- 責務が明確に分離されている
- 変更の影響範囲が限定的

### 3. **拡張性**
- 新機能の追加が容易
- 既存コードへの影響を最小化

### 4. **フレームワーク非依存**
- ビジネスロジックがフレームワークから独立
- フレームワークの変更が容易

### 5. **UI非依存**
- ビジネスロジックがUIから独立
- UIの変更がビジネスロジックに影響しない

### 6. **データベース非依存**
- ビジネスロジックがデータソースから独立
- データソースの変更が容易

## 開発ガイドライン

### 新機能を追加する場合

1. **Domain層**: リポジトリインターフェースを定義(必要な場合)
   ```typescript
   // domain/repositories/NewFeatureRepository.ts
   interface NewFeatureRepository {
     getData(): Promise<DataVo>
   }
   ```

2. **Application層**: ユースケースを実装
   ```typescript
   // application/usecases/NewFeatureUseCaseImpl.ts
   class NewFeatureUseCaseImpl implements NewFeatureUseCase {
     constructor(private repository: NewFeatureRepository) {}
     async execute() { /* ... */ }
   }
   ```

3. **Infrastructure層**: リポジトリ実装を追加
   ```typescript
   // infrastructure/repositories/NewFeatureRepositoryImpl.ts
   class NewFeatureRepositoryImpl implements NewFeatureRepository {
     async getData() { /* HTTP call */ }
   }
   ```

4. **DI層**: ファクトリーに追加
   ```typescript
   // di/UseCaseFactory.ts
   static createNewFeatureUseCase(): NewFeatureUseCase {
     const repo = RepositoryFactory.createNewFeatureRepository()
     return new NewFeatureUseCaseImpl(repo)
   }
   ```

5. **Presentation層**: UIコンポーネントを作成
   ```typescript
   // presentation/pages/new-feature/index.tsx
   const NewFeature: FC = () => {
     const useCase = UseCaseFactory.createNewFeatureUseCase()
     // ...
   }
   ```

### 避けるべきこと

❌ **Domain層がInfrastructure層に依存**
```typescript
// ❌ BAD
import { API_ENDPOINT } from "../../infrastructure/config/const"
```

❌ **Application層がPresentation層に依存**
```typescript
// ❌ BAD
import { Button } from "../../presentation/components/Button"
```

❌ **Domain層がフレームワークに依存**
```typescript
// ❌ BAD
import React from "react"
```

### 推奨される実装

✅ **インターフェースを使った依存性の逆転**
```typescript
// ✅ GOOD - Domain層でインターフェースを定義
interface LoginRepository {
  login(args: LoginArgs): Promise<UserVo>
}

// Infrastructure層で実装
class LoginRepositoryImpl implements LoginRepository {
  async login(args: LoginArgs) { /* ... */ }
}
```

✅ **DIコンテナ経由でのインスタンス生成**
```typescript
// ✅ GOOD
const useCase = UseCaseFactory.createLoginUseCase()
```

## まとめ

このClean Architecture構造により、以下が実現されています:

1. **明確な責務分離**: 各層が明確な役割を持つ
2. **依存関係の一方向性**: 内側の層は外側の層に依存しない
3. **テスト容易性**: 各層を独立してテスト可能
4. **保守性と拡張性**: 変更の影響範囲が限定的
5. **フレームワーク非依存**: ビジネスロジックが独立

この構造を維持することで、長期的な保守性と拡張性を確保できます。
