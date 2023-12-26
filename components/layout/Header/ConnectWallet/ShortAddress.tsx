import { shortenHexString } from '@/components/home/constant';
import { Button } from '@/components/ui/button';
import { walletLogos } from '@/web3/wallets';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  afterIcon?: React.ReactNode;
  toggle: boolean;
}

const ShortAddress = React.forwardRef<HTMLButtonElement, IProps>(({
  afterIcon,
  className,
  toggle,
  ...rest
}, forwardedRef) => {
  const { address, connector } = useAccount();
  const shortAddress = useMemo(
    () => shortenHexString(address as string, 5, 4),
    [address]
  );

  return (
    <Button
      className={
        clsx('flex rounded-full p-2 border-[1px]',
          toggle ? 'border-primary-1 text-primary-1 bg-light-1' : 'bg-light-2 text-grey-1 border-transparent', className)
      }
      ref={forwardedRef}
      {...rest}
    >
      <div
        className='mr-2 flex items-center justify-center rounded-s'
      >
        {connector ? (
          <img
            className='h-6 w-6'
            src={walletLogos[connector.name]}
            alt={connector.name}
          />
        ) : null}
      </div>
      <div
        className='flex flex-1 cursor-pointer items-center justify-between'
      >
        <div className='text-button-16B mr-2'>
          {shortAddress}
        </div>
        {
          afterIcon ? <span className='text-dark-3'>
            {afterIcon}
          </span> : null
        }
      </div>
    </Button>
  );
});

export default ShortAddress;
