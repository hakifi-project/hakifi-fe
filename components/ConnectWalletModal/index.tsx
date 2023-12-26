"use client";

import useAppStore from '@/stores/app.store';
import Wallets, { WalletConfig, WalletIds, isWalletBrowserSupported, walletLogos } from '@/web3/wallets';
import { useCallback, useEffect, useState } from 'react';
import { UserRejectedRequestError } from 'viem';
import { useAccount, useConnect } from 'wagmi';
import Modal from '../common/Modal';
import { signMessage, switchNetwork } from '@wagmi/core';
// import { getNonce, login } from '@/services/auth.api';
import useDisconnectWallet from '@/hooks/useDisconnectWallet';
import { useIsTablet } from '@/hooks/useMediaQuery';
import { useTranslationClient } from '@/i18n/client';
import useWalletStore from '@/stores/wallet.store';
import { enableAutoConnect } from '@/web3/utils';
import { mainChain } from '@/web3/wagmiConfig';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useNotification } from '../common/Notification';
import Wallet from './Wallet';
import { getNonce, login } from '@/apis/auth.api';

const autoConnectWalletIdKey = 'wallet_id';

const getSignMessage = (nonce: string) => {
  return `Please sign this message to verify your address. Nonce: ${nonce}`;
}

const ConnectWalletModal = () => {
  const searchParams = useSearchParams();
  const notification = useNotification();
  const autoConnectWalletId = searchParams.get(autoConnectWalletIdKey);
  const { t } = useTranslationClient('common');
  const [active, setActive] = useState<WalletConfig>(() => {
    let wallet: WalletConfig | undefined;
    if (autoConnectWalletId) {
      wallet = Wallets.find((w) => w.id === autoConnectWalletId);
    }
    if (!wallet) {
      wallet = Wallets.find((wallet) => !!wallet.connector.ready);
    }
    return wallet || Wallets[0];
  });
  const pathname = usePathname();
  const isTablet = useIsTablet();

  const { isOpenConnectWallet, toggleConnectWalletModal } = useAppStore();
  const [setWallet, setAccessToken, setIsLogging, isLogging] = useWalletStore((state) => [
    state.setWallet,
    state.setAccessToken,
    state.setIsLogging,
    state.isLogging
  ]);
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnectWallet();
  const closeModal = () => toggleConnectWalletModal(false);

  const connectWallet = useCallback((wallet: WalletConfig) => {
    setActive(wallet);

    if (!wallet.connector.ready) {
      window.open(wallet.installHref);
    } else {
      onConnect(wallet);
    }

  }, []);

  const onConnect = async (wallet: WalletConfig, isMobile = false) => {
    const { id, connector } = wallet;
    if (isMobile && (!connector.ready || id === WalletIds.Coinbase)) {
      const url =
        window.location.origin +
        window.location.pathname +
        `?${autoConnectWalletIdKey}=${WalletIds.Coinbase}`;
      switch (id) {
        case WalletIds.Metamask:
          return window.open(
            `https://metamask.app.link/dapp/${window.location.host}${pathname}?${autoConnectWalletIdKey}=${WalletIds.Metamask}`
          );
        case WalletIds.Coinbase:
          return window.open(
            `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`
          );
        case WalletIds.TrustWallet:
          return window.open(
            `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(
              url
            )}`
          );
        case WalletIds.C98:
          return window.open(
            `https://coin98.com/dapp/${encodeURIComponent(url)}/${mainChain.id}`
          );
        default:
          break;
      }
    }

    setIsLogging(true);
    try {
      const result = await connectAsync({ connector });
      const nonce = await getNonce(result.account);

      if (result.chain.unsupported) {
        await switchNetwork({ chainId: mainChain.id });
      }
      console.log('wallet');
      const signature = await signMessage({
        message: getSignMessage(nonce),
      });
      const data = await login({
        walletAddress: result.account,
        signature,
      });

      setWallet(data.wallet);
      setAccessToken(data.accessToken);

      notification.success(t('connect_success'))
      // toast.success();
      enableAutoConnect();
      if (result.account) closeModal();
    } catch (error) {
      disconnect();
      let message = 'common:connect_error.default';
      if (error instanceof UserRejectedRequestError) {
        if (error.code === 4001) {
          message = 'common:connect_error.user_rejected';
        }
      }
      // toast.error(t(message));
      console.error('Connect error: ', error);
    }
    setIsLogging(false);
  };

  useEffect(() => {
    if (autoConnectWalletId) {
      window.history.replaceState(history.state, '', pathname);
    }
    if (isConnected || !autoConnectWalletId) return;
    const wallet = Wallets.find((wallet) => wallet.id === autoConnectWalletId);
    if (wallet) {
      onConnect(wallet);
    }
  }, []);

  return (
    <Modal
      isOpen={isOpenConnectWallet}
      isMobileFullHeight
      onRequestClose={closeModal}
      className='max-w-sm'
      title={t('connect_wallet')}
    >
      <div
        className={clsx(
          'flex flex-col gap-y-4 p-0 md:bg-white mt-5',
        )}
      >
        {Wallets.map((wallet) => (
          <Wallet
            key={wallet.id}
            active={wallet.id === active.id}
            connector={wallet.connector}
            logoUrl={walletLogos[wallet.connector.name]}
            onClick={() => connectWallet(wallet)}
            disabled={
              (!isTablet && !wallet.connector.ready && !isWalletBrowserSupported) || isLogging
            }
          />
        ))}
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
