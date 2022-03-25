export const handlePath = (pseudoLink) => {
  switch (pseudoLink.toLowerCase()) {
    case `savanorystė`:
      return `/kaip-galiu-padeti/savanoryste/`;
    case `aukojimas`:
      return `/kaip-galiu-padeti/aukojimas/lietuvoje/`;
    case `budinkite veikti`:
      return `/protesto-formos/budinkite-veikti/ambasada/`;
    case `prekių boikotas`:
      return `/`;
    case `akcijos`:
      return `/protesto-formos/akcijos/`;
    case `renginiai`:
      return `/protesto-formos/renginiai/`;
    case `patikima informacija`:
      return `/bukime-budrus/patikima-informacija/`;
    case `piliečio atmintinė`:
      return `/bukime-budrus/piliecio-atmintine/`;
    case `sukčiai ir dezinformacija`:
      return `/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/`;
    case `kaip galiu padėti`:
      return `/kaip-galiu-padeti/`;
    case `protesto formos`:
      return `/protesto-formos/`;
    case `būkime budrūs`:
      return `/bukime-budrus/`;
    case `pagalba ukrainiečiams lietuvoje`:
      return `/refugee-guide/`;
  }
};
