## Introduction

> no hooks, still making them dance - Jonwayne

Hooks are a feature in Okta that allows Okta to call out to an API, to get direction (or commands) on what to do.

This repository contains code to deploy a serverless API using [Vercel](https://vercel.com/) that uses query parameters to control the responses of the API.  This allows for people to be able to demo Okta Hooks without needing to write code or deploy an API (such as https://github.com/omgitstom/cloudformation).

When specifying your hook URL location in Okta, you can specify query parameters allowing you to demo Okta hooks without modifying any code.

A quick example of this.  If you wanted to show a pre-registration hook that updates the profile to include a frequent flyer number, you would specify this hook URL in Okta:

```
https://myfictionalapi.com/api/pre-reg?mode=profile-update&key=frequentFlyerNo&value=yH18kn3a
```

This url will produce the right response to update the profile with a frequent flyer number on user registration:

```
{
  "commands": [
    {
      "type": "com.okta.user.profile.update",
      "value": {
        "frequentFlyerNo": "yH18kn3a"
      }
    }
  ]
}
```

## Installation

### Prerequisites

To use this code you will need to have your own Vercel deployment. This requires you to:

+ Install [npm](https://www.npmjs.com/get-npm)
+ Install the [Vercel CLI](https://vercel.com/download)
+ Register with Vercel - run `vercel` from your terminal

You can also simply click the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/mraible/okta-hooks)

### Steps

Now that you have `vercel` installed, you can clone this repo and use `vercel` to deploy an api.

First, clone the repo using your terminal:

```
git clone git@github.com:omgitstom/okta-hooks.git
```

Then, change the directory:

```
cd okta-hooks
```

Then, deploy with `vercel`:

```
vercel
```

## Pre-registration

Endpoint: `https://{your-app-name}.vercel.app/api/pre-reg`

Default Response:

```
{
    "commands": []
}
```

### Controlling the response

#### Update profile

To update a profile, specify the `mode` to be `profile-update` in a query parameter:

```
https://{your-app-name}.vercel.app/api/pre-reg?mode=profile-update
```

This will return a command to update the profile:

```
{
    "commands": [
        {
            "type": "com.okta.user.profile.update",
            "value": {
                "customVariable": "customValue"
            }
        }
    ]
}
```

To control the propery and value that is set, you can also pass the `key` and `value` in the query parameters:

```
https://{your-app-name}.vercel.app/api/pre-reg?mode=profile-update&key=favoriteAnimal&value=Miley+Cyrus
```

This will return the specified value in the command:

```
{
    "commands": [
        {
            "type": "com.okta.user.profile.update",
            "value": {
                "favoriteAnimal": "Miley Cyrus"
            }
        }
    ]
}
```

#### Deny registration

To deny the registration, specify the `mode` to be `profile-update` in a query parameter:

```
https://{your-app-name}.vercel.app/api/pre-reg?mode=deny-registration
```

Response:
```
{
    "commands": [
        {
            "type": "com.okta.action.update",
            "value": {
                "registration": "DENY"
            }
        }
    ]
}
```

#### Error

To error to the end user, specify the `mode` to be `error` in a query parameter:

```
https://{your-app-name}.vercel.app/api/pre-reg?mode=error
```

Response:
```
{
  {
    "commands": [],
    "error": {
        "errorSummary": "Customized Error Summary",
        "errorCauses": [
            {
                "errorSummary": "Customized Error Summary",
                "reason": "INVALID_FORMAT",
                "locationType": "body",
                "location": "email",
                "domain": "user"
            }
        ]
    }
  }
}
```

Additional query parameters can be provided to override any property in the errorCauses array.  For example:

```
https://{your-app-name}.vercel.app/api/pre-reg?mode=error&errorSummary=Something+went+wrong&reason=UNKNOWN_PROJECT_ID&locationType=body&location=projectId&domain=project
```

Will respond with:

```
{
    "commands": [],
    "error": {
        "errorSummary": "Something went wrong",
        "errorCauses": [
            {
                "errorSummary": "Something went wrong",
                "reason": "UNKNOWN_PROJECT_ID",
                "locationType": "body",
                "location": "projectId",
                "domain": "project"
            }
        ]
    }
}
```
