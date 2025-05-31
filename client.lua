local QBCore = exports['qb-core']:GetCoreObject()
local zones = {}

local isPlayerInsideBankZone = false
local isPoliceChief = false
local loansEnabled = false -- Loans feature is completely disabled

-- Functions

-- Check if player is a police chief
local function CheckPoliceChiefStatus()
    local Player = QBCore.Functions.GetPlayerData()
    if not Player or not Player.job then return false end
    
    local jobName = Player.job.name
    local jobGrade = Player.job.grade.level
    
    -- Since loans are disabled, we're hardcoding police chief detection
    -- This would only be used if loans are re-enabled in the future
    if (jobName == "police" and jobGrade >= 4) or (jobName == "sheriff" and jobGrade >= 4) then
        return true
    end
    
    return false
end

local function OpenBank()
    -- Check police chief status when opening bank
    isPoliceChief = CheckPoliceChiefStatus()

    -- Trigger progress bar with animation
    QBCore.Functions.Progressbar("open_bank", "فتح البنك...", 2500, false, true, {
        disableMovement = true,
        disableCarMovement = true,
        disableMouse = false,
        disableCombat = true,
    }, {
        animDict = 'amb@prop_human_atm@male@enter',
        anim = 'enter',
        flags = 49,
    }, {}, {}, function() -- On completion
        -- Callback after progressbar completes successfully
        QBCore.Functions.TriggerCallback('qb-banking:server:openBank', function(accounts, statements, playerData)
            SetNuiFocus(true, true)
            SendNUIMessage({
                action = 'openBank',
                accounts = accounts,
                statements = statements,
                playerData = playerData,
                isPoliceChief = isPoliceChief,
                loansEnabled = loansEnabled,
                isArabic = Config.enableArabic
            })
        end)
    end, function() -- On cancel
        -- Cancelled progress bar
        QBCore.Functions.Notify("Bank opening cancelled", "error")
    end)
end

local function OpenATM()
    QBCore.Functions.Progressbar('accessing_atm', Lang:t('progress.atm'), 1500, false, true, {
        disableMovement = false,
        disableCarMovement = false,
        disableMouse = false,
        disableCombat = false,
    }, {
        animDict = 'amb@prop_human_atm@male@enter',
        anim = 'enter',
    }, {
        model = 'prop_cs_credit_card',
        bone = 28422,
        coords = vector3(0.1, 0.03, -0.05),
        rotation = vector3(0.0, 0.0, 180.0),
    }, {}, function()
        QBCore.Functions.TriggerCallback('qb-banking:server:openATM', function(accounts, playerData, acceptablePins)
            SetNuiFocus(true, true)
            SendNUIMessage({
                action = 'openATM',
                accounts = accounts,
                pinNumbers = acceptablePins,
                playerData = playerData
            })
        end)
    end)
end

local function NearATM()
    local playerCoords = GetEntityCoords(PlayerPedId())
    for _, v in pairs(Config.atmModels) do
        local hash = joaat(v)
        local atm = IsObjectNearPoint(hash, playerCoords.x, playerCoords.y, playerCoords.z, 1.5)
        if atm then
            return true
        end
    end
end

-- NUI Callback

RegisterNUICallback('closeApp', function(_, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('withdraw', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:withdraw', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('deposit', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:deposit', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('internalTransfer', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:internalTransfer', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('externalTransfer', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:externalTransfer', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('orderCard', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:orderCard', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('openAccount', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:openAccount', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('renameAccount', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:renameAccount', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('deleteAccount', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:deleteAccount', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('addUser', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:addUser', function(status)
        cb(status)
    end, data)
end)

RegisterNUICallback('removeUser', function(data, cb)
    QBCore.Functions.TriggerCallback('qb-banking:server:removeUser', function(status)
        cb(status)
    end, data)
end)

-- Events

RegisterNetEvent('qb-banking:client:useCard', function()
    if NearATM() then OpenATM() end
end)

-- Threads

CreateThread(function()
    for i = 1, #Config.locations do
        local blip = AddBlipForCoord(Config.locations[i])
        SetBlipSprite(blip, Config.blipInfo.sprite)
        SetBlipDisplay(blip, 4)
        SetBlipScale(blip, Config.blipInfo.scale)
        SetBlipColour(blip, Config.blipInfo.color)
        SetBlipAsShortRange(blip, true)
        BeginTextCommandSetBlipName('STRING')
        AddTextComponentSubstringPlayerName(tostring(Config.blipInfo.name))
        EndTextCommandSetBlipName(blip)
    end
end)

if Config.useTarget then
    CreateThread(function()
        for i = 1, #Config.locations do
            exports['qb-target']:AddCircleZone('bank_' .. i, Config.locations[i], 1.0, {
                name = 'bank_' .. i,
                useZ = true,
                debugPoly = false,
            }, {
                options = {
                    {
                        icon = 'fas fa-university',
                        label = 'Open Bank',
                        action = function()
                            OpenBank()
                        end,
                    }
                },
                distance = 1.5
            })
        end
    end)

    CreateThread(function()
        for i = 1, #Config.atmModels do
            local atmModel = Config.atmModels[i]
            exports['qb-target']:AddTargetModel(atmModel, {
                options = {
                    {
                        icon = 'fas fa-university',
                        label = 'Open ATM',
                        item = 'bank_card',
                        action = function()
                            OpenATM()
                        end,
                    }
                },
                distance = 1.5
            })
        end
    end)
end

if not Config.useTarget then
    CreateThread(function()
        for i = 1, #Config.locations do
            local zone = CircleZone:Create(Config.locations[i], 3.0, {
                name = 'bank_' .. i,
                debugPoly = false,
            })
            zones[#zones + 1] = zone
        end

        local combo = ComboZone:Create(zones, {
            name = 'bank_combo',
            debugPoly = false,
        })

        combo:onPlayerInOut(function(isPointInside)
            isPlayerInsideBankZone = isPointInside
            if isPlayerInsideBankZone then
                exports['qb-core']:DrawText('Open Bank')
                CreateThread(function()
                    while isPlayerInsideBankZone do
                        Wait(0)
                        if IsControlJustPressed(0, 38) then
                            OpenBank()
                        end
                    end
                end)
            else
                exports['qb-core']:HideText()
            end
        end)
    end)
end
