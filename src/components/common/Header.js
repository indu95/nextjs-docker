import * as React from 'react'
import { PowerSettingsNewRounded } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import Toolbar from '@mui/material/Toolbar'
import { useRouter } from 'next/router'
import { PAGES, LOGO } from '../../constants'
import AppBar from '@mui/material/AppBar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import UserDataContext from '../../context/UserContext'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
const styles = {
  toolbarRoot: {
    minHeight: 30
  }
}

const Header = ({ appBaseUrl, brandLogo, isLoggedIn = false, currentPage, children }) => {
  const userContext = React.useContext(UserDataContext)
  let userPermissions = userContext.userPermissions
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const [navigationOptions, setNavigationOptions] = React.useState([...PAGES])

  const router = useRouter()
  const drawerWidth = 200
  const selectedTab = navigationOptions.filter((i) => i.selected)[0]?.id || 1
  const container = process.browser && window !== undefined ? () => document.body : undefined
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleTabChange = (ev, value, doNavigation = true) => {
    const navigationItems = JSON.parse(JSON.stringify(navigationOptions))
    if (doNavigation) {
      router.push({
        pathname: `${navigationItems.filter((i) => i.id == value)[0]?.target}`
      })
    }
  }
  const doLogout = async () => {
    let logoutResp = await fetch(`${appBaseUrl}/api/logout`)
    let parsedLogoutResp = await logoutResp.json()
    if (parsedLogoutResp?.success) {
      setNavigationOptions(JSON.parse(JSON.stringify(navigationOptions)))
      router.push({
        pathname: '/login'
      })
    }
  }

  React.useEffect(() => {
    /*    if (!userPermissions) {
      return
    } */
    let pages = JSON.parse(JSON.stringify(PAGES))

    pages[0].selected = true
    pages[0].open = true

    if (pages[0]?.subPages) {
      pages[0].subPages[0].selected = true
    }

    /*    let filteredPages = pages.filter((page) => {
      let isPageAccessAllowed = false
      for (let i = 0, j = userPermissions.length; i < j; i++) {
        if (page.accessAllowedPermissions.includes(userPermissions[i])) {
          isPageAccessAllowed = true
          break
        }
      }
      return isPageAccessAllowed
    })
    filteredPages.forEach((i) => {
      if (i.target.includes(currentPage)) {
        i.selected = true
      } else {
        i.selected = false
      }
    }) */
    setNavigationOptions(pages)
  }, [])

  const redirectToSubPage = (mainPage, subPage) => {
    let newOptions = JSON.parse(JSON.stringify(PAGES))
    const mainPageIndex = newOptions.findIndex((item) => item.id === mainPage.id)
    newOptions[mainPageIndex].selected = true
    newOptions[mainPageIndex].open = true
    if (subPage?.id) {
      const subPageIndex = newOptions[mainPageIndex].subPages.findIndex((item) => item.id === subPage.id)
      newOptions[mainPageIndex].subPages[subPageIndex].selected = true
    }

    setNavigationOptions(newOptions)
  }

  const expandMainPageOptions = (page) => {
    let newOptions = JSON.parse(JSON.stringify(navigationOptions))
    let selectedPageIndex = newOptions.findIndex((item) => item.id === page.id)
    newOptions[selectedPageIndex].open = !newOptions[selectedPageIndex].open
    setNavigationOptions(newOptions)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isLoggedIn ? (
        <>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <List sx={{ pb: theme.spacing(0.3), pt: theme.spacing(0.3) }}>
                {navigationOptions.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ pb: 0, pt: 0 }} onClick={() => expandMainPageOptions(item)}>
                        <ListItemText
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                          disableTypography
                        >
                          <Box display={'flex'} alignItems={'center'}>
                            {item.label}
                            {item?.open ? (
                              <ArrowDropUpIcon sx={{ fontSize: '1.8rem', mt: 0.5 }}></ArrowDropUpIcon>
                            ) : (
                              <ArrowDropDownIcon sx={{ fontSize: '1.8rem', mt: 0.5 }}></ArrowDropDownIcon>
                            )}
                          </Box>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    {item?.subPages?.length &&
                      item?.open &&
                      item?.subPages?.map((page, i) => (
                        <List key={page.id} sx={{ pb: theme.spacing(0.3), pt: theme.spacing(0.3) }}>
                          <ListItem disablePadding>
                            <ListItemButton sx={{ p: 0 }} onClick={() => redirectToSubPage(item, page)}>
                              <ListItemText disableTypography>
                                <Box ml={5} mr={5}>
                                  <Box
                                    sx={{
                                      cursor: 'pointer',
                                      fontWeight: 600,
                                      color: page?.selected ? theme.palette.text.primary : theme.palette.text.secondary,
                                      borderBottom: page?.selected ? `4px solid ${theme.palette.primary.main}` : 'none',
                                      width: 'fit-content'
                                    }}
                                  >
                                    {page.label}
                                  </Box>
                                </Box>
                              </ListItemText>
                            </ListItemButton>
                          </ListItem>
                        </List>
                      ))}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
            <AppBar position="sticky" color="transparent" sx={{ bgcolor: '#FFFFFF', boxShadow: 'none', p: 0.2 }}>
              <Container maxWidth="false" disableGutters sx={{ pl: 1, pr: 1 }}>
                <Toolbar disableGutters sx={{ justifyContent: 'flex-end', '&.MuiToolbar-root': styles.toolbarRoot }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Avatar
                      alt="Region"
                      sx={{ bgcolor: '#616161', width: 30, height: 30 }}
                      src="/static/images/avatar/1.jpg"
                    />

                    {/*        <Avatar alt="User" sx={{ bgcolor: '#616161', width: 36, height: 36 }}>
                      <IconButton onClick={openUserOptions}>
                        <PersonIcon />
                      </IconButton>
                    </Avatar> */}
                    <Box>
                      <Tooltip title={'Logout'}>
                        <IconButton onClick={doLogout} sx={{ color: grey[900] }}>
                          <PowerSettingsNewRounded sx={{ height: 30, width: 30 }}></PowerSettingsNewRounded>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </Toolbar>
              </Container>
            </AppBar>
            {children}
          </Box>
        </>
      ) : null}
    </Box>
  )
}
export default Header
