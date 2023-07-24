import { createStyles } from '@mantine/core';

import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  top: {
    display: 'flex',
    alignItems: 'center',
    height: theme.other.topHeight,
    backgroundColor: theme.colors.teal[8],
    padding: '0 20px',
  },
}));

export default function Top() {
  const { classes } = useStyles();

  return (
    <div className={classes.top}>
      <Image src="/logo.svg" alt="logo" width={106} height={36} />
    </div>
  );
}
