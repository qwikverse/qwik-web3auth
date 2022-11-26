import { NoSerialize } from '@builder.io/qwik';
import * as web3Core from "@web3auth/core";
import * as web3authBase  from "@web3auth/base";
import * as openLogin  from "@web3auth/openlogin-adapter";
import * as web3authModal from "@web3auth/modal";

export type LoginProvider = 'google' | 'discord' | 'facebook' | 'twitch';
export type JWTLoginProvider = 'apple' | 'twitter' | 'email';

export interface SiteStore {
    user: any;
}
  
export interface Web3authStore {
    web3auth: NoSerialize<web3authModal.Web3Auth | null>;
    // web3authNode?: NoSerialize<web3authNode.Web3Auth | null>;
    web3authCore: NoSerialize<web3Core.Web3AuthCore | null>;
    adapter: NoSerialize<openLogin.OpenloginAdapter | null>;
    provider: NoSerialize<web3authBase.SafeEventEmitterProvider | null>;
    loading: boolean;
}