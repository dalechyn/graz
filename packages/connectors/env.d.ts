import type { ChainInfo, Keplr } from "@keplr-wallet/types";
type Coin98 = Omit<Keplr, 'experimentalSignEIP712CosmosTx_v0'>

interface Request {
  method: string;
  params?: object;
}

interface Cosmos {
  request(request: Request): Promise<any>;
  on(type: string, listener: EventListenerOrEventListenerObject): Event;
  off(event: Event): void;
}

interface Cosmostation {
  cosmos: Cosmos;
  providers: {
    keplr: Keplr;
  };
}

interface CosmostationWindow {
  cosmostation?: Cosmostation;
}

interface CompassSignOptions {
  readonly preferNoSetFee?: boolean;
  readonly preferNoSetMemo?: boolean;
  readonly disableBalanceCheck?: boolean;
}

interface Key {
  readonly name: string;
  readonly algo: string;
  readonly pubKey: Uint8Array;
  readonly address: Uint8Array;
  readonly bech32Address: string;
  readonly isNanoLedger: boolean;
}

interface Compass {
  defaultOptions: {
    sign?: CompassSignOptions;
  };
  disconnect(): Promise<void>;
  enable(chainIds: string | string[]): Promise<void>;
  suggestToken(chainId: string, contractAddress: string): Promise<void>;
  mode: 'extension';
  getKey(chainId: string): Promise<Key>;
  getOfflineSigner(chainId: string): OfflineAminoSigner & OfflineDirectSigner;
  getOfflineSignerOnlyAmino(chainId: string): OfflineAminoSigner;
  getOfflineSignerAuto(chainId: string): Promise<OfflineSigner>;
  signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: CompassSignOptions
  ): Promise<AminoSignResponse>;
  signDirect(
    chainId: string,
    signer: string,
    signDoc: {
      /** SignDoc bodyBytes */
      bodyBytes?: Uint8Array | null;
      /** SignDoc authInfoBytes */
      authInfoBytes?: Uint8Array | null;
      /** SignDoc chainId */
      chainId?: string | null;
      /** SignDoc accountNumber */
      accountNumber?: Long | null;
    },
    signOptions?: CompassSignOptions
  ): Promise<DirectSignResponse>;
  signArbitrary(
    chainId: string,
    signer: string,
    data: string | Uint8Array
  ): Promise<StdSignature>;
  getEnigmaPubKey(chainId: string): Promise<Uint8Array>;
  getEnigmaTxEncryptionKey(
    chainId: string,
    nonce: Uint8Array
  ): Promise<Uint8Array>;
  enigmaEncrypt(
    chainId: string,
    contractCodeHash: string,
    msg: object
  ): Promise<Uint8Array>;
  enigmaDecrypt(
    chainId: string,
    ciphertext: Uint8Array,
    nonce: Uint8Array
  ): Promise<Uint8Array>;
  sendTx(
    chainId: string,
    tx: Uint8Array,
    mode: BroadcastMode
  ): Promise<Uint8Array>;
  experimentalSuggestChain(chainInfo: ChainInfo): Promise<void>;
}

interface CompassWindow {
  compass?: Compass;
}

interface Coin98Window {
  coin98?: {
    keplr: Coin98;
  };
}

type VectisWindow = import("@vectis/extension-client").VectisWindow;
type KeplrWindow = import("@keplr-wallet/types").Window;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface Window extends VectisWindow, KeplrWindow, Coin98Window, CompassWindow, CosmostationWindow {
  //
}
