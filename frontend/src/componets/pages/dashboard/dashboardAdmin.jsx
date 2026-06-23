import { BannerDhasboardAdmin } from "../../organims/dashboardAdmin/bannerDashboardAdmin";
import { MainContentAdmin } from "../../organims/dashboardAdmin/mainContentAdmin";
import { CardsStatsAdmin } from "../../organims/dashboardAdmin/statsDashboardAdmin";
import { MyTemplate } from "../../templates/myTemplate";

function DashboardAdminPage () {
  
  return(
    <MyTemplate>
      <BannerDhasboardAdmin/>
      <CardsStatsAdmin/>
      <MainContentAdmin/>
    </MyTemplate>
  )
}

export {DashboardAdminPage}