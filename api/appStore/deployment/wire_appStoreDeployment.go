package appStoreDeployment

import (
	appStoreDeployment "github.com/devtron-labs/devtron/pkg/appStore/deployment"
	appStoreDeploymentCommon "github.com/devtron-labs/devtron/pkg/appStore/deployment/common"
	appStoreDeploymentTool "github.com/devtron-labs/devtron/pkg/appStore/deployment/tool"
	"github.com/devtron-labs/devtron/pkg/appStore/history"
	"github.com/devtron-labs/devtron/pkg/appStore/history/repository"
	appStoreRepository "github.com/devtron-labs/devtron/pkg/appStore/repository"
	"github.com/google/wire"
)

var AppStoreDeploymentWireSet = wire.NewSet(
	appStoreRepository.NewClusterInstalledAppsRepositoryImpl,
	wire.Bind(new(appStoreRepository.ClusterInstalledAppsRepository), new(*appStoreRepository.ClusterInstalledAppsRepositoryImpl)),
	appStoreDeploymentCommon.NewAppStoreDeploymentCommonServiceImpl,
	wire.Bind(new(appStoreDeploymentCommon.AppStoreDeploymentCommonService), new(*appStoreDeploymentCommon.AppStoreDeploymentCommonServiceImpl)),
	appStoreDeploymentTool.NewAppStoreDeploymentHelmServiceImpl,
	wire.Bind(new(appStoreDeploymentTool.AppStoreDeploymentHelmService), new(*appStoreDeploymentTool.AppStoreDeploymentHelmServiceImpl)),
	appStoreDeployment.NewAppStoreDeploymentServiceImpl,
	wire.Bind(new(appStoreDeployment.AppStoreDeploymentService), new(*appStoreDeployment.AppStoreDeploymentServiceImpl)),
	NewAppStoreDeploymentRestHandlerImpl,
	wire.Bind(new(AppStoreDeploymentRestHandler), new(*AppStoreDeploymentRestHandlerImpl)),
	NewAppStoreDeploymentRouterImpl,
	wire.Bind(new(AppStoreDeploymentRouter), new(*AppStoreDeploymentRouterImpl)),
	history.NewAppStoreChartsHistoryServiceImpl,
	wire.Bind(new(history.AppStoreChartsHistoryService), new(*history.AppStoreChartsHistoryServiceImpl)),
	repository.NewAppStoreChartsHistoryRepositoryImpl,
	wire.Bind(new(repository.AppStoreChartsHistoryRepository), new(*repository.AppStoreChartsHistoryRepositoryImpl)),
)
