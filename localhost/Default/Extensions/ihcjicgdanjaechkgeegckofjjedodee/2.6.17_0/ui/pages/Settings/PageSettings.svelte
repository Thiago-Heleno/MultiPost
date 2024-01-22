<script lang="ts">
    import Divider from "@/ui/components/Divider.svelte";
    import SettingsItem from "./SettingsItem.svelte";
    import {getProtectionService} from "@/domain/protection-service";
    import {onMount} from "svelte";
    import {
        EXCLUSION_ADS,
        EXCLUSION_SCAMS,
        EXCLUSION_MALWARE,
        ExclusionType,
    } from "@/domain/types/exclusion";
    import {SETTING_GTLD, SETTING_SKIMMER_PROTECTION} from "@/domain/types/settings";
    import { translateText } from "@/utils/locales";

    let adsProtectionEnabled = false;
    let malwareProtectionEnabled = false;
    let scamProtectionEnabled = false;
    let gtldProtectionEnabled = false;
    let skimmerProtectionEnabled = false;
    $: allProtectionEnabled =
        adsProtectionEnabled ||
        malwareProtectionEnabled ||
        scamProtectionEnabled;

    const protectionService = getProtectionService();

    onMount(async () => {
        loadProtectionStatus();
    });

    async function loadProtectionStatus() {
        const protectionStatus = await protectionService.getProtectionStatus();
        adsProtectionEnabled = protectionStatus.get(EXCLUSION_ADS) ?? true;
        malwareProtectionEnabled =
            protectionStatus.get(EXCLUSION_MALWARE) ?? true;
        scamProtectionEnabled = protectionStatus.get(EXCLUSION_SCAMS) ?? true;
        gtldProtectionEnabled = protectionStatus.get(SETTING_GTLD) ?? false;
        skimmerProtectionEnabled =
            protectionStatus.get(SETTING_SKIMMER_PROTECTION) ?? true;

        console.debug("protection status", {protectionStatus});
        console.debug("protection status", {
            adsProtectionEnabled,
            malwareProtectionEnabled,
            scamProtectionEnabled,
            gtldProtectionEnabled,
            skimmerProtectionEnabled,
        });
    }

    async function toggleAllProtections(enabled: boolean) {        
        await protectionService.toggleAllProtections(enabled);
        loadProtectionStatus();
    }

    async function toggleProtection(
        protectionType: ExclusionType,
        enabled: boolean
    ) {
        await protectionService.toggleIndividualProtection(
            protectionType,
            enabled
        );
        loadProtectionStatus();
    }

    async function toggleSkimmerProtection(enabled: boolean) {
        await protectionService.toggleIndividualProtectionBySettingKey(SETTING_SKIMMER_PROTECTION, enabled);
        loadProtectionStatus();
    }

    async function toggleGtld(enabled: boolean) {
        await protectionService.toggleIndividualProtectionBySettingKey(SETTING_GTLD, enabled);
        loadProtectionStatus();
    }
</script>

<div class="flex flex-col justify-start items-start w-full h-full pt-6 dark:text-white dark:text-opacity-80">
    <p class="text-sm font-normal mb-8">
        {translateText("settingsSummaryText")}
        <!-- These protection settings apply to all websites. Settings can be
        customized for individual websites in the Current website tab. -->
    </p>

    <div class="max-h-[350px] overflow-y-scroll overflow-x-hidden pr-4">
        <div
        class="flex flex-col w-full gap-2 h-fit"
    >
        <SettingsItem
            title={translateText("settingsAllProtectionLabel")}
            description={translateText("settingsAllProtectionDescription")}
            enabled={allProtectionEnabled}
            onChanged={toggleAllProtections}
        />
        <Divider class="mb-2 mt-2" />
        <SettingsItem
            title="Ads/Trackers"
            description={translateText("settingsAdsDescription")}
            isSubItem
            enabled={adsProtectionEnabled}
            onChanged={(enabled) => toggleProtection(EXCLUSION_ADS, enabled)}
        />
        <Divider class="mb-2 mt-2 ml-6" />
        <SettingsItem
            title="Malware"
            description={translateText("settingsMalwareDescription")}
            isSubItem
            enabled={malwareProtectionEnabled}
            onChanged={(enabled) =>
                toggleProtection(EXCLUSION_MALWARE, enabled)}
        />
        <Divider class="mb-2 mt-2 ml-6" />
        <SettingsItem
            title="Scams"
            description={translateText("settingsScamsDescription")}
            isSubItem
            enabled={scamProtectionEnabled}
            onChanged={(enabled) => toggleProtection(EXCLUSION_SCAMS, enabled)}
        />
        <Divider class="mb-2 mt-2" />
        <SettingsItem
            title="gTLD domains"
            description={translateText("settingsGtldDescription")}
            enabled={gtldProtectionEnabled}
            onChanged={(enabled) => toggleGtld(enabled)}
        />
        <Divider class="mb-2 mt-2" />
        <SettingsItem
            title={translateText("settingsToggleSkimmerLabel")}
            description={translateText("settingsToggleSkimmerDescription")}
            enabled={skimmerProtectionEnabled}
            onChanged={(enabled) => toggleSkimmerProtection(enabled)}
        />
    </div>
    </div>
</div>
