"use client"
import { Button } from "@/components/ui/button";


export default function OauthButtons({providers, handleClick, formBelow}) {
  return (
    <div className={`flex ${formBelow ? "flex-col-reverse" : "flex-col"} gap-4`}>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-border"></span>
        <span className="shrink-0 text-muted-foreground text-xs px-6">Or, Continue with</span>
        <span className="h-px flex-1 bg-border"></span>
      </span>

      <div
        className={`${
          providers.length > 4
            ? 'space-y-2'
            : `grid grid-cols-${providers.length} gap-4`  // Default grid for 1, 3, 4 providers
        }`}
      >
        {providers.map(({ provider, icon: Icon }) => (
          <Button
            onClick={() => { handleClick(provider) }}
            className="w-full space-x-2"
            variant="outline"
            size="lg"
            key={provider}
          >
            {(providers.length < 2 || providers.length > 4) && (
              <>
                <Icon />
                <span className="capitalize">Continue with {provider}</span>
              </>
            )}
            {providers.length === 2 && (
              <>
                <Icon />
                <span className="capitalize">{provider}</span>
              </>
            )}
            {providers.length > 2 && providers.length <= 4 && <Icon />}
          </Button>
        ))}
      </div>
    </div>
  );
}