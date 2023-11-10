import type { ChainInfo } from "@keplr-wallet/types";
import type { AccountData, Connector } from "graz";

export class CosmostationConnector implements Connector {
  name = "Cosmostation";
  id = "coin98";
  keystoreEvent = "cosmostation_keystorechange";

  private getConnector() {
    if (typeof window.cosmostation !== "undefined") return window.cosmostation;
    throw new Error("window.cosmostation is not defined");
  }

  checkConnector() {
    try {
      this.getConnector();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async enable(chainId: string) {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Cosmostation is not available");
      }
      await this.getConnector().providers.keplr?.enable(chainId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async experimentalSuggestChain(chainInfo: ChainInfo) {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Cosmostation is not available");
      }
      await this.getConnector().providers.keplr?.experimentalSuggestChain(chainInfo);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAccount(chainId: string, prefix?: string): Promise<AccountData> {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Cosmostation is not available");
      }
      const key = await this.getConnector().providers.keplr?.getKey(chainId);
      if (!key) {
        throw new Error("Cosmostation is not available");
      }
      return {
        address: key.address,
        bech32Address: key.bech32Address,
        pubKey: key.pubKey,
        algo: key.algo,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getOfflineSigner(chainId: string) {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Cosmostation is not available");
      }
      const signer = this.getConnector().providers.keplr?.getOfflineSigner(chainId);
      if (!signer) {
        throw new Error("Cosmostation is not available");
      }
      return signer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getOfflineSignerOnlyAmino(chainId: string) {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Cosmostation is not available");
      }
      const signer = this.getConnector().providers.keplr?.getOfflineSignerOnlyAmino(chainId);
      if (!signer) {
        throw new Error("Cosmostation is not available");
      }
      return signer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getOfflineSignerAuto(chainId: string) {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Cosmostation is not available");
      }
      const signer = await this.getConnector().providers.keplr?.getOfflineSignerAuto(chainId);
      if (!signer) {
        throw new Error("Cosmostation is not available");
      }
      return signer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

