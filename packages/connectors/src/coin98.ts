import type { ChainInfo } from "@keplr-wallet/types";
import type { AccountData, Connector } from "graz";

export class Coin98Connector implements Connector {
  name = "Coin98";
  id = "coin98";
  keystoreEvent = "keplr_keystorechange";

  private getConnector() {
    if (typeof window.coin98?.keplr !== "undefined") return window.coin98?.keplr;
    throw new Error("window.coin98.keplr is not defined");
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
        throw new Error("Coin98 is not available");
      }
      await this.getConnector().enable(chainId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async experimentalSuggestChain(chainInfo: ChainInfo) {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Coin98 is not available");
      }
      await this.getConnector().experimentalSuggestChain(chainInfo);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAccount(chainId: string, prefix?: string): Promise<AccountData> {
    try {
      const isAvailable = this.checkConnector();
      if (!isAvailable) {
        throw new Error("Coin98 is not available");
      }
      const key = await this.getConnector().getKey(chainId);
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
        throw new Error("Coin98 is not available");
      }
      const signer = this.getConnector().getOfflineSigner(chainId);
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
        throw new Error("Coin98 is not available");
      }
      const signer = this.getConnector().getOfflineSignerOnlyAmino(chainId);
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
        throw new Error("Coin98 is not available");
      }
      const signer = await this.getConnector().getOfflineSignerAuto(chainId);
      return signer;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
