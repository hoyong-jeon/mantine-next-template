import React from 'react';
import { createStyles, Select, Slider, ThemeIcon } from '@mantine/core';
import { IconPiano, IconHeartbeat } from '@tabler/icons-react';
import { Kit, Layer } from '@customTypes/playground';
import { KITS_MAP, MELODY_KITS, RHYTHM_KITS } from '@constants/playground';
import Lane from './Lane';

const useStyles = createStyles(() => ({
  pane: {
    height: '100%',
    display: 'flex',
  },
  // side
  side: {
    width: 250,
    height: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  instControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instControlRight: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: 144,
  },
}));

interface Props {
  layer: Layer;
}

export default function LayerPaneContent({ layer }: Props) {
  const { classes } = useStyles();

  const { layerMeta, instKits } = layer;
  const { layerType } = layerMeta;
  const defaultKit = layerType === 'melody' ? MELODY_KITS[0] : RHYTHM_KITS[0];

  const [selectedKit, setSelectedKit] = React.useState<Kit>(defaultKit);

  const kitOptions = Object.keys(instKits).map((kit) => ({
    value: kit,
    label: KITS_MAP[kit as Kit],
  }));

  const handleSelectKit = (kit: Kit) => {
    setSelectedKit(kit);
  };

  return (
    <>
      <div className={classes.side}>
        <div className={classes.instControls}>
          <ThemeIcon
            variant="light"
            radius="xl"
            size={50}
            color={layerType === 'melody' ? 'teal' : 'cyan'}
          >
            {layerType === 'melody' ? <IconPiano size={30} /> : <IconHeartbeat size={30} />}
          </ThemeIcon>
          <div className={classes.instControlRight}>
            <Select
              placeholder="악기 선택"
              data={kitOptions}
              size="xs"
              value={selectedKit}
              onChange={handleSelectKit}
              styles={(t) => ({
                item: {
                  // applies styles to selected item
                  '&[data-selected]': {
                    '&, &:hover': {
                      backgroundColor:
                        t.colorScheme === 'dark' ? t.colors.teal[9] : t.colors.teal[1],
                      color: t.colorScheme === 'dark' ? t.white : t.colors.teal[9],
                    },
                  },

                  // applies styles to hovered item (with mouse or keyboard)
                  '&[data-hovered]': {},
                },
              })}
            />
            <Slider size="xs" color={layerType === 'melody' ? 'teal' : 'cyan'} />
          </div>
        </div>
      </div>
      <Lane layerMeta={layerMeta} instruments={instKits[selectedKit]} />
    </>
  );
}
